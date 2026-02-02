package app.tracker.dto;

import java.time.LocalDate;

public record DayScoreItemDto(
    LocalDate date,
    int score
) {}
