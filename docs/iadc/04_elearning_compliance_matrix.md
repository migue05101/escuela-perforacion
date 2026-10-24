# eLearning Requirements Compliance Matrix

This matrix maps the IADC requirements for courses delivered 100 % by eLearning to the features of the Escuela de Perforación platform. It covers RigPass eLearning Requirements & Agreement (SCO-01E), DIT eLearning Requirements (DIT-01E), the RigPass Handbook (SCO-01) and the DIT Handbook (DIT-01).

The **evidence** column names the screen, export or database table an auditor can inspect.

| # | Requirement | How the platform meets it | Evidence |
|---|---|---|---|
| 1 | Secure login with a unique password per trainee | Personal account per learner (ID number + password, min. 8 characters). The server stores hashed credentials (Supabase Auth). Accounts are unique by ID number. | `auth.users`, `trainees` (unique `doc_number`) |
| 2 | Verify identity at enrollment | Full name, ID type and number, live photo, declaration of truth, personal-data consent | `events` type `enroll`, `id_verify` (purpose `enroll`) + photo |
| 3 | Verify identity before launching course content | On every new session, before the first module: password + live photo, or one-time instructor code | `events` `id_verify` (purpose `start`) |
| 4 | Verify identity at the start of the final assessment | Password + live photo or instructor code + no-assistance declaration. The server rejects `start_exam` without a verification in the last 30 minutes. | `events` `id_verify` (purpose `exam`), `exam_declaration`; function `start_exam` |
| 5 | Record start time and end time for each trainee | Per-module `started_at` / `completed_at`; per-session `module_start` / `module_leave` events | `progress`, `events` |
| 6 | Track total time spent in training | Active seconds per module. The timer pauses on inactivity and when the window is hidden. Totals are shown to the learner, instructor and exports. | `progress.active_seconds`; CSV "Tiempo activo (h)" |
| 7 | Prelude disclaimer: self-paced course and expected completion time in hours | Mandatory notice before the first module, with an acceptance checkbox | `events` `disclaimer`; course screen |
| 8 | Each module completed before advancing to the next module and the final test | Modules unlock sequentially; the exam unlocks only when all modules are complete (also enforced server-side) | Course screen; `start_exam` check |
| 9 | Skip and fast-forward disabled | In certification mode the subtitle **Skip** button, demo-skip buttons and practice shortcuts are removed. **Next** appears only after the narration ends. Minimum time per module is enforced. | Course behaviour; `progress` times ≥ module minimums |
| 10 | Knowledge checks with remediation throughout each module | 3 checks per module. A wrong answer triggers re-teaching of the referenced lesson and a retry until correct. | `events` `check` (try, correct) |
| 11 | Comprehensive final knowledge assessment aligned with the curriculum | Random stratified draw from a bank tagged by module (≥ 3 items per module). RigPass 40 items; DIT 30 items. | `exam_bank`, `exam_attempts` |
| 12 | Feedback to trainees based on assessment results | Score, module breakdown, topics to review, and an explanation for each missed item | Result screen; `submit_exam` response |
| 13 | Retest for learners who fail | New random draw per attempt, up to 3; then instructor review and reset (logged) | `exam_attempts`, `events` `exam_reset` |
| 14 | Minimum passing grade (DIT: 75 %) | `pass_mark` 75 for all courses, graded on the server | `courses.pass_mark` |
| 15 | Test security | Bank not in the app or the public repository, readable only by staff. Answer key never sent to the learner. Old items deactivated, not deleted. | RLS policy `eb_all`; `server/supabase.sql` |
| 16 | Maintain and report completion record, assessment record, start/end times, total time, completion date and name | Instructor panel per learner; CSV per course; full JSON backup | Panel del instructor → Exportar registros |
| 17 | Retain records securely, available for audit, ≥ 5 years | Server database with row-level security, append-only event log, daily backups, monthly exports | QMS §6 |
| 18 | Internationally recognized eLearning standard (e.g. SCORM) | {{The platform is a standalone web LMS. If IADC requires SCORM packaging, the course can be packaged as SCORM 1.2 — to be confirmed with IADC staff (rigpass@iadc.org / DIT@iadc.org).}} | — |
| 19 | Live technical support during designated hours (≥ 12 h/day for home-based delivery) | Support hours and channels configured and shown on the **Ayuda** screen | `src/config.js` → `support`; Ayuda screen |
| 20 | Approved instructor available at set times, with reliable contact information | Instructor names, hours and contacts on the **Ayuda** screen; instructors also issue identity codes | Ayuda screen; `verif_codes` |
| 21 | FAQ list | **Ayuda y soporte → Preguntas frecuentes** | Ayuda screen |
| 22 | Sufficient hardware for concurrent users (home-based) | Static web app on a CDN (GitHub Pages) plus managed database (Supabase) that scales with plan | Hosting plan |
| 23 | Certificate of completion issued immediately after passing | Provider record of completion with QR verification on passing; official certificate uploaded to the IADC database | `certificates`; `verify_certificate` |
| 24 | Quality Statement & Comment Policy given to each student at the start (RigPass) | Shown and accepted before module 1; always available on the **Ayuda** screen | `events` `disclaimer` (`quality_statement: true`) |
| 25 | Surveys and feedback used for improvement (DIT QMS) | Mandatory 5-item survey after passing; complaints module with responses | `surveys`, `complaints`; QMS §7 |
| 26 | IADC permission to access the course for audit | IADC auditors get an instructor account (read access to all records) and a learner test account | Signed SCO-01E / DIT-01E agreement |
