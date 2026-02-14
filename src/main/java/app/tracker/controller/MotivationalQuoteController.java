package app.tracker.controller;

import app.tracker.dto.MotivationalQuoteDto;
import app.tracker.service.MotivationalQuoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/motivation")
public class MotivationalQuoteController {

    private final MotivationalQuoteService quoteService;

    public MotivationalQuoteController(MotivationalQuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping("/today")
    public ResponseEntity<MotivationalQuoteDto> getTodayQuote() {
        MotivationalQuoteDto quote = quoteService.getTodayQuote();
        return quote != null ? ResponseEntity.ok(quote) : ResponseEntity.notFound().build();
    }

    @PostMapping("/remark")
    public ResponseEntity<MotivationalQuoteDto> updateDailyRemark(@RequestBody Map<String, String> request) {
        String remark = request.get("remark");
        LocalDate date = LocalDate.parse(request.get("date"));
        
        MotivationalQuoteDto updated = quoteService.updateDailyRemark(date, remark);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @GetMapping("/previous")
    public List<MotivationalQuoteDto> getPreviousQuotes(@RequestParam(defaultValue = "7") int days) {
        return quoteService.getPreviousQuotes(days);
    }

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return quoteService.getAllCategories();
    }
}
