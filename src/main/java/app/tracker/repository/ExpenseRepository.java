package app.tracker.repository;

import app.tracker.entity.Expense;
import app.tracker.enums.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByDateBetweenOrderByDateDesc(LocalDate from, LocalDate to);

    List<Expense> findByCategory(ExpenseCategory category);
}
