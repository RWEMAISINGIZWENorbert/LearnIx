# Assignments & Exams Module Documentation

This document defines the **Assignments feature only** for the educational platform (SDMS-like), covering **Homework**, **Secure Exams**, UI flow, backend logic, and security mechanisms using **React.js (frontend)** and **Node.js (backend)**.

---

## 1. Assignment Types

### 1.1 Homework Assignment
Used for learning and practice.

**Characteristics:**
- Research allowed
- Collaboration allowed
- Files, text, or links submission
- Flexible time window

**Examples:**
- Essay writing
- Research tasks
- Project work

---

### 1.2 Exam Assignment (Secure)
Used for formal assessment.

**Characteristics:**
- Time-bound
- Individual work only
- High security
- Auto-submit on timeout

**Examples:**
- Mid-term exams
- Final exams
- Class tests

---

## 2. Assignment Targeting Structure

Assignments are always linked to:

```
Academic Year
 → Level (S1, S2, S4)
   → Combination (Optional: MCB, MPC)
     → Stream (A, B, I, II)
```

**Examples stored in DB:**
- `S1 A`
- `S4 MCB A`

---

## 3. Teacher UI Flow (Assignment Creation)

### Add Assignment Screen

```
Step 1: Select Assignment Type
        - Homework
        - Exam

Step 2: Select Target Class
        Level → Combination → Stream

Step 3: Assignment Details
        - Title
        - Description / Instructions
        - Attachments (PDF, Links)

Step 4: Schedule
        - Start Date & Time
        - End Date & Time
        - Duration (Exam only)

Step 5: Security Settings (Exam only)
        - Fullscreen enforcement
        - Disable copy/paste
        - Tab-switch detection
        - Screenshot detection

Step 6: Publish or Save Draft
```

---

## 4. Student UI Flow

### Student Dashboard

```
My Assignments
---------------------------------
Homework: Biology Essay     (Pending)
Exam: Math Midterm          (Start Exam)
```

### Exam Mode UI

- Forced fullscreen
- Countdown timer
- Auto-save answers
- Violation warnings

---

## 5. Assignment Lifecycle

```
Draft → Published → Active → Submitted → Graded → Archived
```

---

## 6. Backend Core Models (Example)

### Assignment Schema (MongoDB-like)

```js
{
  _id: ObjectId,
  title: String,
  type: 'HOMEWORK' | 'EXAM',
  academicYearId: ObjectId,
  level: 'S1' | 'S2' | 'S4',
  combination: 'MCB' | 'MPC' | null,
  stream: 'A' | 'B' | 'I' | 'II',
  instructions: String,
  startTime: Date,
  endTime: Date,
  durationMinutes: Number,
  securityConfig: {
    fullscreen: Boolean,
    blockCopyPaste: Boolean,
    detectTabSwitch: Boolean,
    detectScreenshot: Boolean
  },
  createdBy: teacherId,
  status: 'DRAFT' | 'PUBLISHED'
}
```

---

## 7. Exam Security Measures (Technical)

### 7.1 Frontend (React.js)

#### Fullscreen Enforcement

```js
document.documentElement.requestFullscreen();
```

#### Detect Tab Switching

```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    reportViolation('TAB_SWITCH');
  }
});
```

#### Disable Copy / Paste

```js
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x'].includes(e.key)) {
    e.preventDefault();
  }
});
```

---

### 7.2 Backend (Node.js)

#### Start Exam Session

```js
POST /api/exams/:assignmentId/start
```

```js
{
  sessionId,
  studentId,
  deviceFingerprint,
  startedAt
}
```

#### Submit Exam

```js
POST /api/exams/:assignmentId/submit
```

Backend validates:
- Time window
- Session validity
- Single device

---

## 8. Violation Logging

```js
{
  studentId,
  assignmentId,
  violationType: 'TAB_SWITCH' | 'SCREENSHOT' | 'COPY_ATTEMPT',
  timestamp
}
```

**Admin & Teacher can review logs.**

---

## 9. Anti-Cheating Enhancements (Advanced)

- Randomized questions per student
- Question shuffling
- Time-per-question limits
- Plagiarism detection (Homework)
- Answer similarity analysis
- AI-generated content detection

---

## 10. Grading & Feedback

- Auto-grading (MCQs)
- Manual grading (Essays)
- Inline comments
- Score normalization

---

## 11. Permissions

| Action | Teacher | Admin |
|------|--------|-------|
| Create Assignment | ✅ | ❌ |
| Publish Assignment | ✅ | ❌ |
| Grade Assignment | ✅ | ❌ |
| Override Grades | ❌ | ✅ |

---

## 12. Integration Points

- Promotion Engine (exam scores)
- Academic Reports
- SDMS Export
- Student Performance Analytics

---

## 13. Implementation Checklist

1. Assignment CRUD APIs
2. Secure exam session service
3. Student exam UI
4. Violation tracking
5. Submission & grading flow
6. Performance testing

---

## Final Notes

This Assignments module is:
- SDMS-compatible
- Secure by design
- Scalable to national usage
- Ready for future AI proctoring

You can extend this without breaking existing architecture.

