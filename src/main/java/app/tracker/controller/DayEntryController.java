package app.tracker.controller;

import app.tracker.dto.DailyHabitSaveDto;
import app.tracker.dto.DayEntryResponseDto;
import app.tracker.enums.DayType;
import app.tracker.service.DayEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/days")
public class DayEntryController {

    private final DayEntryService dayEntryService;

    public DayEntryController(DayEntryService dayEntryService) {
        this.dayEntryService = dayEntryService;
    }

    @GetMapping("/{date}")
    public ResponseEntity<DayEntryResponseDto> getDay(@PathVariable LocalDate date) {
        return dayEntryService.getDay(date)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{date}")
    public DayEntryResponseDto getOrCreateDay(@PathVariable LocalDate date) {
        return dayEntryService.getOrCreateDay(date);
    }

    @PutMapping("/{date}/day-type")
    public DayEntryResponseDto setDayType(@PathVariable LocalDate date, @RequestBody DayTypeBody body) {
        return dayEntryService.setDayType(date, body.dayType());
    }

    @PutMapping("/{date}/screen-time")
    public DayEntryResponseDto setScreenTime(@PathVariable LocalDate date, @RequestBody ScreenTimeBody body) {
        return dayEntryService.setScreenTime(date, body.minutes());
    }

    @PutMapping("/{date}/habits")
    public DayEntryResponseDto saveDailyHabits(@PathVariable LocalDate date, @RequestBody List<DailyHabitSaveDto> body) {
        return dayEntryService.saveDailyHabits(date, body != null ? body : List.of());
    }

    @GetMapping("/{date}/score")
    public int getDailyScore(@PathVariable LocalDate date) {
        return dayEntryService.getDailyScore(date);
    }

    public record DayTypeBody(DayType dayType) {}
    public record ScreenTimeBody(int minutes) {}
}
