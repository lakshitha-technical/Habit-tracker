package app.tracker.entity;

import app.tracker.enums.HabitScope;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "habit")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "score_value", nullable = false)
    private Integer scoreValue; // 1 or 2

    @Column(name = "is_negative", nullable = false)
    private Boolean isNegative = false;

    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "applies_to", nullable = false, columnDefinition = "habit_scope_enum")
    private HabitScope appliesTo = HabitScope.BOTH;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @OneToMany(mappedBy = "habit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DailyHabit> dailyHabits = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getScoreValue() { return scoreValue; }
    public void setScoreValue(Integer scoreValue) { this.scoreValue = scoreValue; }
    public Boolean getIsNegative() { return isNegative; }
    public void setIsNegative(Boolean isNegative) { this.isNegative = isNegative; }
    public HabitScope getAppliesTo() { return appliesTo; }
    public void setAppliesTo(HabitScope appliesTo) { this.appliesTo = appliesTo; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
    public List<DailyHabit> getDailyHabits() { return dailyHabits; }
    public void setDailyHabits(List<DailyHabit> dailyHabits) { this.dailyHabits = dailyHabits; }
}
