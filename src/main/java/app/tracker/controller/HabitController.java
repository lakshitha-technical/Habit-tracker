package app.tracker.controller;

import app.tracker.dto.HabitDto;
import app.tracker.entity.Habit;
import app.tracker.repository.HabitRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitController {

    private final HabitRepository habitRepository;

    public HabitController(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    @GetMapping
    public List<HabitDto> list() {
        return habitRepository.findAll().stream()
            .map(HabitController::toDto)
            .toList();
    }

    private static HabitDto toDto(Habit h) {
        return new HabitDto(
            h.getId(),
            h.getName(),
            h.getScoreValue() != null ? h.getScoreValue() : 1,
            Boolean.TRUE.equals(h.getIsNegative()),
            h.getAppliesTo()
        );
    }
}
