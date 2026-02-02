package app.tracker.entity;

import app.tracker.enums.DayType;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "day_entry")
public class DayEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate date;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "day_type", nullable = false)
    private DayType dayType;

    @Column(name = "screen_time_minutes")
    private Integer screenTimeMinutes = 0; // negative score source

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @OneToMany(mappedBy = "dayEntry", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DailyHabit> dailyHabits = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public DayType getDayType() { return dayType; }
    public void setDayType(DayType dayType) { this.dayType = dayType; }
    public Integer getScreenTimeMinutes() { return screenTimeMinutes; }
    public void setScreenTimeMinutes(Integer screenTimeMinutes) { this.screenTimeMinutes = screenTimeMinutes; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
    public List<DailyHabit> getDailyHabits() { return dailyHabits; }
    public void setDailyHabits(List<DailyHabit> dailyHabits) { this.dailyHabits = dailyHabits; }
}
