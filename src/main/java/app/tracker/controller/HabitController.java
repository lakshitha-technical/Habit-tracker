package app.tracker.controller;

import app.tracker.dto.HabitCreateDto;
import app.tracker.dto.HabitDto;
import app.tracker.entity.Habit;
import app.tracker.enums.HabitScope;
import app.tracker.repository.HabitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<HabitDto> get(@PathVariable Long id) {
        return habitRepository.findById(id)
            .map(HabitController::toDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public HabitDto create(@RequestBody HabitCreateDto dto) {
        Habit h = new Habit();
        h.setName(dto.name());
        h.setScoreValue(dto.scoreValue() != null ? dto.scoreValue() : 1);
        h.setIsNegative(Boolean.TRUE.equals(dto.isNegative()));
        h.setAppliesTo(dto.appliesTo() != null ? dto.appliesTo() : HabitScope.BOTH);
        return toDto(habitRepository.save(h));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HabitDto> update(@PathVariable Long id, @RequestBody HabitCreateDto dto) {
        return habitRepository.findById(id)
            .map(habit -> {
                habit.setName(dto.name());
                habit.setScoreValue(dto.scoreValue() != null ? dto.scoreValue() : 1);
                habit.setIsNegative(Boolean.TRUE.equals(dto.isNegative()));
                habit.setAppliesTo(dto.appliesTo() != null ? dto.appliesTo() : HabitScope.BOTH);
                return toDto(habitRepository.save(habit));
            })
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (habitRepository.existsById(id)) {
            habitRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
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
