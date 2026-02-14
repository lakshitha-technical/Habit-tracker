package app.tracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        return Map.of(
            "message", "Tracker API",
            "endpoints", Map.of(
                "days", "/api/days/{date}",
                "habits", "/api/habits",
                "expenses", "/api/expenses",
                "summary", "/api/summary/{year}/{month}"
            )
        );
    }
}
