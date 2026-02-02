package app.tracker.service;

import app.tracker.dto.ExpenseCreateDto;
import app.tracker.dto.ExpenseDto;
import app.tracker.entity.Expense;
import app.tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Transactional(readOnly = true)
    public Optional<ExpenseDto> getById(Long id) {
        return expenseRepository.findById(id).map(this::toDto);
    }

    @Transactional(readOnly = true)
    public List<ExpenseDto> findByDateBetween(LocalDate from, LocalDate to) {
        return expenseRepository.findByDateBetweenOrderByDateDesc(from, to).stream()
            .map(this::toDto)
            .toList();
    }

    @Transactional
    public ExpenseDto create(ExpenseCreateDto dto) {
        Expense e = new Expense();
        e.setDate(dto.date());
        e.setAmount(dto.amount());
        e.setCategory(dto.category());
        e.setDescription(dto.description());
        return toDto(expenseRepository.save(e));
    }

    @Transactional
    public Optional<ExpenseDto> update(Long id, ExpenseCreateDto dto) {
        return expenseRepository.findById(id)
            .map(e -> {
                e.setDate(dto.date());
                e.setAmount(dto.amount());
                e.setCategory(dto.category());
                e.setDescription(dto.description());
                return toDto(expenseRepository.save(e));
            });
    }

    @Transactional
    public boolean delete(Long id) {
        if (!expenseRepository.existsById(id)) return false;
        expenseRepository.deleteById(id);
        return true;
    }

    private ExpenseDto toDto(Expense e) {
        return new ExpenseDto(
            e.getId(),
            e.getDate(),
            e.getAmount(),
            e.getCategory(),
            e.getDescription()
        );
    }
}
