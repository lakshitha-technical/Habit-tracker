package app.tracker.dto;

import java.time.LocalDate;

public record MotivationalQuoteDto(
    Long id,
    String quote,
    String author,
    String category,
    LocalDate date,
    String dailyRemark
) {}
