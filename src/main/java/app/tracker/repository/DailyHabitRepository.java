package app.tracker.repository;

import app.tracker.entity.DailyHabit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DailyHabitRepository extends JpaRepository<DailyHabit, Long> {

    List<DailyHabit> findByDayEntryId(Long dayEntryId);

    Optional<DailyHabit> findByDayEntryIdAndHabitId(Long dayEntryId, Long habitId);
}
