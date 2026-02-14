package app.tracker.service;

import app.tracker.dto.MotivationalQuoteDto;
import app.tracker.entity.MotivationalQuote;
import app.tracker.repository.MotivationalQuoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MotivationalQuoteService {

    private final MotivationalQuoteRepository quoteRepository;

    public MotivationalQuoteService(MotivationalQuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    public MotivationalQuoteDto getTodayQuote() {
        LocalDate today = LocalDate.now();
        Optional<MotivationalQuote> todayQuote = quoteRepository.findByDate(today);
        
        if (todayQuote.isPresent()) {
            return toDto(todayQuote.get());
        }
        
        // If no quote for today, get a random one and assign it to today
        MotivationalQuote randomQuote = quoteRepository.findRandomQuote();
        if (randomQuote != null) {
            randomQuote.setDate(today);
            return toDto(quoteRepository.save(randomQuote));
        }
        
        return null;
    }

    public MotivationalQuoteDto updateDailyRemark(LocalDate date, String remark) {
        Optional<MotivationalQuote> existingQuote = quoteRepository.findByDate(date);
        
        if (existingQuote.isPresent()) {
            MotivationalQuote quote = existingQuote.get();
            quote.setDailyRemark(remark);
            return toDto(quoteRepository.save(quote));
        }
        
        return null;
    }

    public List<MotivationalQuoteDto> getPreviousQuotes(int days) {
        LocalDate startDate = LocalDate.now().minusDays(days);
        LocalDate endDate = LocalDate.now().minusDays(1);
        
        List<MotivationalQuote> quotes = quoteRepository.findByDateBetweenOrderByDate(startDate, endDate);
        return quotes.stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public List<String> getAllCategories() {
        return quoteRepository.findAllCategories();
    }

    private MotivationalQuoteDto toDto(MotivationalQuote quote) {
        return new MotivationalQuoteDto(
            quote.getId(),
            quote.getQuote(),
            quote.getAuthor(),
            quote.getCategory(),
            quote.getDate(),
            quote.getDailyRemark()
        );
    }
}
