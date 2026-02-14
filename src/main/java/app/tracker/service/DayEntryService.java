package app.tracker.service;

import app.tracker.dto.DailyHabitItemDto;
import app.tracker.dto.DailyHabitSaveDto;
import app.tracker.dto.DayEntryResponseDto;
import app.tracker.dto.DayScoreItemDto;
import app.tracker.entity.DailyHabit;
import app.tracker.entity.DayEntry;
import app.tracker.entity.Habit;
import app.tracker.enums.DayType;
import app.tracker.enums.HabitScope;
import app.tracker.repository.DailyHabitRepository;
import app.tracker.repository.DayEntryRepository;
import app.tracker.repository.HabitRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DayEntryService {

    /** Minutes of screen time per -1 score point. */
    private static final int SCREEN_TIME_MINUTES_PER_PENALTY = 60;

    private final DayEntryRepository dayEntryRepository;
    private final DailyHabitRepository dailyHabitRepository;
    private final HabitRepository habitRepository;

    public DayEntryService(DayEntryRepository dayEntryRepository,
                           DailyHabitRepository dailyHabitRepository,
                           HabitRepository habitRepository) {
        this.dayEntryRepository = dayEntryRepository;
        this.dailyHabitRepository = dailyHabitRepository;
        this.habitRepository = habitRepository;
    }

    @Transactional(readOnly = true)
    public Optional<DayEntryResponseDto> getDay(LocalDate date) {
        return dayEntryRepository.findByDate(date)
            .map(this::toResponse);
    }

    @Transactional
    public DayEntryResponseDto getOrCreateDay(LocalDate date) {
        try {
            DayEntry entry = dayEntryRepository.findByDate(date)
                .orElseGet(() -> createDayEntry(date));
            return toResponse(entry);
        } catch (DataIntegrityViolationException e) {
            // Handle race condition - another thread created the record
            DayEntry entry = dayEntryRepository.findByDate(date)
                .orElseThrow(() -> new RuntimeException("Failed to create or find day entry"));
            return toResponse(entry);
        }
    }

    @Transactional
    public DayEntryResponseDto setDayType(LocalDate date, DayType dayType) {
        DayEntry entry = getOrCreateDayEntry(date);
        entry.setDayType(dayType);
        return toResponse(dayEntryRepository.save(entry));
    }

    @Transactional
    public DayEntryResponseDto setScreenTime(LocalDate date, int minutes) {
        DayEntry entry = getOrCreateDayEntry(date);
        entry.setScreenTimeMinutes(minutes);
        return toResponse(dayEntryRepository.save(entry));
    }

    @Transactional
    public DayEntryResponseDto saveDailyHabits(LocalDate date, List<DailyHabitSaveDto> dtos) {
        DayEntry entry = getOrCreateDayEntry(date);
        for (DailyHabitSaveDto dto : dtos) {
            Habit habit = habitRepository.findById(dto.habitId())
                .orElseThrow(() -> new IllegalArgumentException("Habit not found: " + dto.habitId()));
            DailyHabit daily = dailyHabitRepository
                .findByDayEntryIdAndHabitId(entry.getId(), habit.getId())
                .orElseGet(() -> {
                    DailyHabit newDaily = new DailyHabit();
                    newDaily.setDayEntry(entry);
                    newDaily.setHabit(habit);
                    return dailyHabitRepository.save(newDaily);
                });
            if (dto.completed() != null) daily.setCompleted(dto.completed());
            if (dto.valueMinutes() != null) daily.setValueMinutes(dto.valueMinutes());
            dailyHabitRepository.save(daily);
        }
        dayEntryRepository.flush();
        return toResponse(dayEntryRepository.findById(entry.getId()).orElseThrow());
    }

    @Transactional(readOnly = true)
    public int getDailyScore(LocalDate date) {
        return dayEntryRepository.findByDate(date)
            .map(this::calculateDailyScore)
            .orElse(0);
    }

    @Transactional(readOnly = true)
    public List<DayScoreItemDto> getDailyScoresInRange(LocalDate from, LocalDate to) {
        return dayEntryRepository.findByDateBetweenOrderByDateAsc(from, to).stream()
            .map(e -> new DayScoreItemDto(e.getDate(), calculateDailyScore(e)))
            .toList();
    }

    private DayEntry getOrCreateDayEntry(LocalDate date) {
        return dayEntryRepository.findByDate(date)
            .orElseGet(() -> createDayEntry(date));
    }

    private DayEntry createDayEntry(LocalDate date) {
        DayEntry entry = new DayEntry();
        entry.setDate(date);
        entry.setDayType(defaultDayType(date));
        entry.setScreenTimeMinutes(0);
        return dayEntryRepository.save(entry);
    }

    private static DayType defaultDayType(LocalDate date) {
        DayOfWeek dow = date.getDayOfWeek();
        return (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) ? DayType.WEEKEND : DayType.WEEKDAY;
    }

    private DayEntryResponseDto toResponse(DayEntry entry) {
        List<DailyHabitItemDto> habits = new ArrayList<>();
        for (DailyHabit dh : entry.getDailyHabits()) {
            Habit h = dh.getHabit();
            habits.add(new DailyHabitItemDto(
                dh.getId(),
                h.getId(),
                h.getName(),
                dh.getCompleted(),
                dh.getValueMinutes()
            ));
        }
        return new DayEntryResponseDto(
            entry.getId(),
            entry.getDate(),
            entry.getDayType(),
            entry.getScreenTimeMinutes(),
            calculateDailyScore(entry),
            habits
        );
    }

    /**
     * Daily score: sum of habit points (completed, scope-matched) minus screen time penalty.
     * Recovery days (PERIODS, SICK): no screen time penalty.
     */
    private int calculateDailyScore(DayEntry entry) {
        boolean recovery = entry.getDayType() == DayType.PERIODS || entry.getDayType() == DayType.SICK;
        int score = 0;

        boolean isWeekend = entry.getDayType() == DayType.WEEKEND;
        for (DailyHabit dh : entry.getDailyHabits()) {
            Habit h = dh.getHabit();
            if (!habitAppliesToDay(h, isWeekend)) continue;
            if (Boolean.TRUE.equals(h.getIsNegative())) {
                if (!recovery && dh.getValueMinutes() != null && dh.getValueMinutes() > 0) {
                    score -= (dh.getValueMinutes() / SCREEN_TIME_MINUTES_PER_PENALTY);
                }
            } else if (Boolean.TRUE.equals(dh.getCompleted())) {
                score += h.getScoreValue() != null ? h.getScoreValue() : 1;
            }
        }

        if (!recovery && entry.getScreenTimeMinutes() != null && entry.getScreenTimeMinutes() > 0) {
            score -= entry.getScreenTimeMinutes() / SCREEN_TIME_MINUTES_PER_PENALTY;
        }
        return score;
    }

    private static boolean habitAppliesToDay(Habit h, boolean isWeekend) {
        HabitScope scope = h.getAppliesTo();
        if (scope == HabitScope.BOTH) return true;
        return isWeekend ? scope == HabitScope.WEEKEND : scope == HabitScope.WEEKDAY;
    }
}
