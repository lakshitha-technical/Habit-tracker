You are a senior full-stack engineer and product designer.

I want to build a **personal Habit Tracker + Money Tracker web application**
for **daily mobile usage**, deployed as a **website (PWA)** — NOT an Android app.

### CORE CONSTRAINTS
- 100% FREE stack
- Mobile-first UI
- Website only (Add to Home Screen support)
- Simple, clean, humane design
- Designed for ONE user (me)
- Long-term daily usage

---

### TECH STACK (MANDATORY)
Frontend:
- React (Vite)
- Tailwind CSS
- Mobile-first design
- PWA support

Backend:
- Spring Boot (Java)
- REST APIs
- Spring Data JPA

Database:
- PostgreSQL (Supabase / Neon compatible)

Hosting:
- Frontend: Netlify / Vercel
- Backend: Render
- DB: Supabase / Neon

---

### FUNCTIONAL REQUIREMENTS

## 1. DAY TYPES
Each day must be ONE of:
- WEEKDAY
- WEEKEND
- PERIODS
- SICK

Rules:
- PERIODS or SICK days are **recovery days**
- No negative scoring on recovery days

---

## 2. HABIT TRACKER RULES

### WEEKDAY – POSITIVE HABITS (+1 / +2)
Checkbox list:
- Exercise / Meditation
- Breakfast
- Lunch
- Dinner
- Fiber
- Protein
- 3L Water
- Eye Exercise
- Badam Grape Water
- LinkedIn (company / learning)
- LeetCode

Scoring:
- +1 = normal completion
- +2 = extra effort (user selected)

---

### WEEKDAY – NEGATIVE HABITS
- Mindful scrolling
  - Screen time ≤ 3h → 0
  - 3–5h → −1
  - >5h → −2
- Chocolate / Sweet / Junk / Outside food → −1

---

### WEEKEND HABITS
Checkbox list:
- Run
- Temple
- Self-care
- Painting
- LeetCode
- Learning

Optional:
- Went outside → requires remark (shopping / chores / social)

NO penalties on weekends.

---

### PERIODS / SICK DAY MODE
Only allow:
- Mindful eating
- Mindful scrolling
- Fruits
- Meditation

Rules:
- No penalties
- No productivity pressure
- Day labeled as **RECOVERY DAY**

---

## 3. DAILY SCORE LOGIC
Score = Positive − Negative

Day Status:
- ≥ +6 → GOOD DAY 🟢
- +2 to +5 → OK DAY 🟡
- < +2 → DOWN DAY 🔴
- PERIODS / SICK → RECOVERY DAY 🟣

---

## 4. MONEY TRACKER

Expense Categories:
- NECESSARY
- UNNECESSARY
- INNER_JOY 💙

Fields:
- Date
- Amount
- Category
- Payment Mode (GPay / Cash)
- Optional note

Rules:
- Manual entry only (no real GPay API)
- Monthly graphs
- Correlate spending with day type (optional insight)

---

## 5. UI SCREENS (MOBILE FIRST)

1. Daily Tracker Screen (default)
2. Add Expense Screen
3. Calendar View (color-coded days)
4. Monthly Insights Dashboard

Design principles:
- No guilt
- Clear visual feedback
- Minimal clicks
- Thumb-friendly

---

## 6. BACKEND REQUIREMENTS

- REST APIs only
- Clean entity relationships
- Validation
- Date-based queries
- Monthly summary APIs

---

## 7. DATABASE DESIGN
Design normalized PostgreSQL tables for:
- day_entry
- habit
- daily_habit
- expense

Include:
- SQL schema
- JPA entities
- Repository interfaces

---

## 8. DELIVERABLES (IMPORTANT)

Give me the solution in THIS ORDER:

1. High-level architecture diagram (text)
2. Database schema (tables + fields)
3. Spring Boot entities & repositories
4. REST API endpoints
5. React component structure
6. Sample UI code for:
   - Daily habit screen
   - Expense entry
7. Deployment instructions (free tiers only)

DO NOT over-engineer.
DO NOT add authentication.
ASSUME single-user system.

Explain decisions briefly and clearly.
