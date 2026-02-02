package app.tracker.service;

import app.tracker.dto.DayScoreItemDto;
import app.tracker.dto.MonthlySummaryDto;
import app.tracker.entity.Expense;
import app.tracker.enums.ExpenseCategory;
import app.tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class SummaryService {

    private final DayEntryService dayEntryService;
    private final ExpenseRepository expenseRepository;

    public SummaryService(DayEntryService dayEntryService, ExpenseRepository expenseRepository) {
        this.dayEntryService = dayEntryService;
        this.expenseRepository = expenseRepository;
    }

    @Transactional(readOnly = true)
    public MonthlySummaryDto getMonthlySummary(int year, int month) {
        LocalDate from = LocalDate.of(year, month, 1);
        LocalDate to = from.withDayOfMonth(from.lengthOfMonth());

        List<DayScoreItemDto> dailyScores = dayEntryService.getDailyScoresInRange(from, to);
        int totalHabitScore = dailyScores.stream().mapToInt(DayScoreItemDto::score).sum();

        List<Expense> expenses = expenseRepository.findByDateBetweenOrderByDateDesc(from, to);
        Map<ExpenseCategory, BigDecimal> totalByCategory = new EnumMap<>(ExpenseCategory.class);
        for (ExpenseCategory c : ExpenseCategory.values()) {
            totalByCategory.put(c, BigDecimal.ZERO);
        }
        BigDecimal totalExpenses = BigDecimal.ZERO;
        for (Expense e : expenses) {
            totalByCategory.merge(e.getCategory(), e.getAmount(), BigDecimal::add);
            totalExpenses = totalExpenses.add(e.getAmount());
        }

        return new MonthlySummaryDto(
            year,
            month,
            dailyScores,
            totalHabitScore,
            totalByCategory,
            totalExpenses
        );
    }
}
