package app.tracker.dto;

import app.tracker.enums.DayType;

import java.time.LocalDate;
import java.util.List;

public record DayEntryResponseDto(
    Long id,
    LocalDate date,
    DayType dayType,
    Integer screenTimeMinutes,
    Integer dailyScore,
    List<DailyHabitItemDto> dailyHabits
) {}
