package app.tracker.repository;

import app.tracker.entity.DayEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DayEntryRepository extends JpaRepository<DayEntry, Long> {

    Optional<DayEntry> findByDate(LocalDate date);

    List<DayEntry> findByDateBetweenOrderByDateAsc(LocalDate from, LocalDate to);

    boolean existsByDate(LocalDate date);
}
