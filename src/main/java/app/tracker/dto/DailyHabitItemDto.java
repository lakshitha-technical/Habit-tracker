package app.tracker.dto;

public record DailyHabitItemDto(
    Long id,
    Long habitId,
    String habitName,
    Boolean completed,
    Integer valueMinutes
) {}
