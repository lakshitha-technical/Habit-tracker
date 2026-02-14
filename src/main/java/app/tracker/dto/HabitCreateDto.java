package app.tracker.dto;

import app.tracker.enums.HabitScope;

public record HabitCreateDto(
    String name,
    Integer scoreValue,
    Boolean isNegative,
    HabitScope appliesTo
) {}
