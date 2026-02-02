package app.tracker.dto;

import app.tracker.enums.ExpenseCategory;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseCreateDto(
    LocalDate date,
    BigDecimal amount,
    ExpenseCategory category,
    String description
) {}
