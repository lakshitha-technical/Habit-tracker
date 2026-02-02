package app.tracker.controller;

import app.tracker.dto.MonthlySummaryDto;
import app.tracker.service.SummaryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summary")
public class MonthlySummaryController {

    private final SummaryService summaryService;

    public MonthlySummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @GetMapping("/{year}/{month}")
    public MonthlySummaryDto getMonthly(
            @PathVariable int year,
            @PathVariable int month) {
        return summaryService.getMonthlySummary(year, month);
    }
}
