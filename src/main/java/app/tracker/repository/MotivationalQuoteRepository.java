package app.tracker.repository;

import app.tracker.entity.MotivationalQuote;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MotivationalQuoteRepository extends JpaRepository<MotivationalQuote, Long> {

    Optional<MotivationalQuote> findByDate(LocalDate date);

    @Query(value = "SELECT * FROM motivational_quotes ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    MotivationalQuote findRandomQuote();

    List<MotivationalQuote> findByDateBetweenOrderByDate(LocalDate startDate, LocalDate endDate);

    @Query(value = "SELECT DISTINCT category FROM motivational_quotes", nativeQuery = true)
    List<String> findAllCategories();
}
