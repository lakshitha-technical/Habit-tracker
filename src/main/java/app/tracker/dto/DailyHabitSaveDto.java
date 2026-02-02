package app.tracker.dto;

/**
 * Request body for saving one habit completion for a day.
 * For screen-time habits, use valueMinutes; for checkmark habits, use completed.
 */
public record DailyHabitSaveDto(
    Long habitId,
    Boolean completed,
    Integer valueMinutes
) {}
