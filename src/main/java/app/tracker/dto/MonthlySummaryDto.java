package app.tracker.dto;

import app.tracker.enums.ExpenseCategory;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record MonthlySummaryDto(
    int year,
    int month,
    List<DayScoreItemDto> dailyScores,
    int totalHabitScore,
    Map<ExpenseCategory, BigDecimal> totalByCategory,
    BigDecimal totalExpenses
) {}
