package app.tracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
@RequiredArgsConstructor
public class DatabaseTest {

    private final DataSource dataSource;
    private final Environment environment;

    @Bean
    public CommandLineRunner testDatabaseConnection() {
        return args -> {
            System.out.println("=== Database Connection Test ===");
            System.out.println("DATABASE_URL: " + environment.getProperty("DATABASE_URL"));
            System.out.println("DATABASE_USERNAME: " + environment.getProperty("DATABASE_USERNAME"));
            
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("✅ Database connection successful!");
                System.out.println("Connection valid: " + connection.isValid(5));
            } catch (Exception e) {
                System.out.println("❌ Database connection failed: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }
}
