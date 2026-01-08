# Academic Structure & Class Management

## Purpose
This document explains **how to design and implement an SDMS‑like academic structure** for a school management platform used in Rwanda. It covers **Levels, Streams, Subject Combinations, UI flow, database design, and system rules**.

The goal is to allow an **admin** to easily configure:
- Levels such as **S1, S2, S4**
- Optional **Subject Combinations** for upper secondary
- Streams such as **A, B, I, II**
- Auto‑generated class names like **S1 A** or **S4 MCB A**

---

## Key Terminology (Standard & Official)

| Concept | Term Used |
|------|----------|
| S1, S4 | **Level** |
| A, B, I, II | **Stream** |
| MPC, MCB | **Subject Combination** |
| Primary / Secondary | **Education Stage** |
| CBC / Knowledge Based | **Curriculum Type** |

These terms align with **Rwanda SDMS, REB, and real school usage**.

---

## Academic Structure Hierarchy

```
Education Stage
 └── Level (S1, S4)
      ├── Stream (A, B)                // if NO combinations
      └── Subject Combination (MCB)
           └── Stream (A, B)
```

### Rules
- **Lower Secondary (S1–S3)** → Streams only
- **Upper Secondary (S4–S6)** → Combinations → Streams
- Subject combinations are **optional per level**
- Streams always belong to:
  - a Level (no combination)
  - OR a Level + Combination

---

## Database Design

### 1. Education Levels

```ts
education_levels
- id
- code        // S1, S4
- name        // Senior 1, Senior 4
- stage       // lower_secondary | upper_secondary
- curriculum  // CBC | KB
```

---

### 2. Subject Combinations (Reusable)

```ts
subject_combinations
- id
- code        // MCB
- name        // Mathematics – Chemistry – Biology
```

---

### 3. Level ↔ Combination Mapping (Optional)

```ts
level_combinations
- id
- level_id
- combination_id
```

If a level has **no records here**, it does **not** use combinations.

---

### 4. Streams (Core Table)

```ts
streams
- id
- level_id
- combination_id   // nullable
- code              // A, B
- name              // S1 A | S4 MCB A
```

This table supports **both simple and complex structures**.

---

## Class Name Generation Logic

Class names are **auto‑generated**, never typed manually.

```ts
if (combination_id == null) {
  name = `${level.code} ${stream.code}`
} else {
  name = `${level.code} ${combination.code} ${stream.code}`
}
```

### Examples
| Level | Combination | Stream | Stored Name |
|----|----|----|----|
| S1 | null | A | S1 A |
| S4 | MCB | A | S4 MCB A |

---

## UI Flow (Admin Perspective)

### 1. Dashboard

```
Dashboard
 └── Academic Setup
      ├── Levels
      ├── Academic Years
      └── Promotion Rules
```

---

### 2. Levels List Screen

Shows all levels with summary info.

```
Levels
+ Add Level

Senior 1 (S1) – Streams: 2
Senior 4 (S4) – Combinations: 2
```

---

### 3. Create Level (Step 1)

```
Level Code: S4
Level Name: Senior 4
Education Stage: Upper Secondary
[ Next ]
```

---

### 4. Combination Decision (Step 2)

```
Does this level use subject combinations?
( ) No
( ) Yes
```

---

### 5A. Stream Setup (No Combinations – e.g. S1)

```
Stream Format: Alphabetical (A, B, C)
Number of Streams: 2

Preview:
S1 A
S1 B

[ Create Streams ]
```

---

### 5B. Combination Selection (Yes – e.g. S4)

```
Select Combinations:
☑ MCB
☑ MPC
[ Next ]
```

---

### 6. Streams per Combination

```
MCB
Streams: 2
Preview: S4 MCB A, S4 MCB B

MPC
Streams: 2
Preview: S4 MPC A, S4 MPC B

[ Create Streams ]
```

---

### 7. Level Details Screen

#### Senior 1
```
Streams:
- S1 A
- S1 B
```

#### Senior 4
```
MCB:
- S4 MCB A
- S4 MCB B

MPC:
- S4 MPC A
- S4 MPC B
```

---

## Student Enrollment (Next Usage)

Students are always assigned to a **stream**.

```
Select Academic Year
Select Level
Select Stream
```

---

## Promotion & Academic Year (Context)

- Promotions move students **from one level to another**
- Streams and combinations are re‑assigned per academic year
- All records reference `academic_year_id`

---

## SDMS Compatibility Notes

- Use **Level, Stream, Combination** naming
- Store human‑readable class names (e.g. S4 MCB A)
- Provide CSV / Excel export

### Common Export Fields
```
StudentRegNo
FirstName
LastName
Gender
Level
Stream
Combination
AcademicYear
```

---

## Design Principles Followed

- Progressive disclosure (step‑by‑step UI)
- Auto‑generation (no manual class names)
- Single responsibility per screen
- Rwanda education system alignment
- SDMS‑ready architecture

---

## Recommended Implementation Order

1. Academic Years
2. Levels
3. Combinations
4. Streams
5. Student Enrollment
6. Promotion Engine
7. SDMS Export

---

## Final Note

This structure is **production‑ready**, **scalable**, and suitable for:
- Public schools
- Private schools
- CBC & Knowledge‑based systems
- National‑level integrations

You can safely build on this without refactoring later.

