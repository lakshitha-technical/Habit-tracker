package app.tracker.dto;

import app.tracker.enums.HabitScope;

public record HabitDto(
    Long id,
    String name,
    int scoreValue,
    boolean isNegative,
    HabitScope appliesTo
) {}
