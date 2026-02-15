package app.tracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DatabaseConfig {

    private final Environment environment;

    @PostConstruct
    public void logDatabaseConfig() {
        System.out.println("DATABASE_URL: " + environment.getProperty("DATABASE_URL"));
        System.out.println("DATABASE_USERNAME: " + environment.getProperty("DATABASE_USERNAME"));
        System.out.println("PORT: " + environment.getProperty("PORT"));
    }
}
