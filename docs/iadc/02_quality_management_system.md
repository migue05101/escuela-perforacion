# Quality Management System and Administrative Procedures

**Training provider:** {{PROVIDER}} · **Primary location:** {{ADDRESS}}
**Programs:** IADC RigPass® (land endorsement, 100 % eLearning) and IADC DIT (eLearning courses)
**Document owner:** Quality Assurance Manager · **Review frequency:** every 6 months and after every audit

> Text in `{{…}}` must be completed by the provider before submission. The procedures below describe how the provider runs the courses on the Escuela de Perforación platform. The platform enforces most controls automatically; the evidence for each control is listed.

---

## 1. Organization and responsibilities

| Role | Name | Qualifications | Responsibilities |
|---|---|---|---|
| Primary contact / Program administrator | {{NAME}} | {{…}} | IADC correspondence, database uploads, fees, program changes (DIT-03M / RigPass modification) within 30 days |
| Quality Assurance Manager | {{NAME}} | {{Min. 2 years in HSE or training QA}} | QMS ownership, internal audits, corrective actions, review of surveys and complaints |
| IADC-approved instructors | {{NAMES}} | See section 9 | Learner support, identity verification by code, review of assessments, sign certificates |
| Technical support | {{NAME / provider}} | {{…}} | Live help desk (section 8), platform availability, backups |

## 2. Course administration

1. **Course definition.** Each course has a fixed title, description, target audience, level, duration (total hours, days, hours per day), learning objectives per module, class size limits, certificate validity and delivery method. These are recorded in the course syllabus (`03_course_syllabi.md`) and in the platform course table. The same definition is used for every learner.
2. **Roster.** Before learners start, the administrator enters the course and learner roster in the IADC accreditation database. The platform's export **Registros por curso (CSV)** gives name, ID, company and dates.
3. **Delivery.** Delivery is 100 % self-paced eLearning on the platform. Learners use their own device, or the provider's computers and Meta Quest headsets at the primary location.
4. **Consistency.** Duration, content and assessment are identical for every learner and location. Changes follow section 7.

## 3. Learner identity verification and attendance

| When | How | Evidence |
|---|---|---|
| Enrollment | Full name, ID type and number, unique password (min. 8 characters), live photo, declaration that the account is personal, and personal-data consent (Colombian Law 1581 of 2012) | `trainees`, `events: enroll, id_verify(enroll)`, photo in private storage |
| Before launching course content (each session) | Password re-entry plus live photo, **or** a one-time 6-digit code issued by an instructor after confirming identity, by video call or in person (for devices without a camera, such as VR headsets) | `events: id_verify(start)` |
| Before the final assessment | Password plus live photo or instructor code, plus a signed declaration that the learner will take the exam alone and without materials | `events: id_verify(exam), exam_declaration`. The server refuses to start the exam without a verification in the previous 30 minutes. |

- Instructors compare verification photos with the enrollment photo in the learner record (**Panel del instructor → Aprendiz → Bitácora**). Mismatches are handled as a non-conformity: the attempt is voided, the learner is contacted, and the case is recorded.
- **Attendance.** Attendance means active time on task. Each module has a minimum active time. The timer pauses after {{5}} minutes without interaction (mouse, touch, keyboard, controller or head movement in VR) and when the window is hidden. Start and end times and total active time are recorded per module and session.

## 4. Assessment

1. **Formative.** Every module ends with knowledge checks. A wrong answer triggers remediation: the instructor avatar re-teaches the related lesson, and the learner must answer correctly to continue. Every answer is logged (`events: check`).
2. **Practical (where applicable).** 3D simulator practices must be passed with at least 70 points; the learner repeats them until passing (`events: activity`).
3. **Summative (final exam).** The written final assessment covers all modules:
   - **Sitting.** It is drawn at random by the server from a secured question bank, stratified by module (RigPass: 40 questions; DIT: 30 questions), with option order randomized.
   - **Grading.** Grading is done on the server. **Minimum passing grade: 75 %.**
   - **Unlock and timing.** It unlocks only after all modules are complete. An open attempt resumes the same questions for 3 hours.
4. **Feedback.** After grading, the learner receives the score, a breakdown by module with the topics to review, and the explanation for each missed item.
5. **Retest.** A learner who fails may retest with a new random draw, up to {{3}} attempts. After that, an instructor reviews the case (records, remediation) and re-enables the exam. The reset is logged.
6. **Test security.**
   - The question bank is not shipped in the application or in the public code repository. It is stored server-side and readable only by staff.
   - Learners never receive the answer key.
   - Bank changes deactivate rather than delete old items, so graded attempts remain traceable.
   - The master bank files are kept by the QA Manager in restricted storage.

## 5. Certificates

- **Platform record.** On passing, the platform immediately issues a provider record of completion with a QR code for verification. It shows:
  - name, ID (masked) and course title;
  - endorsement (land) and completion date;
  - expiry: none for RigPass; 36 months for DIT;
  - score, instructor and provider;
  - IADC program ID and record number.
- **Official IADC certificate.** The administrator uploads the completion to the IADC accreditation database, which issues the official IADC RigPass certificate or card, or the DIT certificate of completion. Only learners who completed all modules and passed the assessment are uploaded.
- **Corrections.** Certificates issued in error are revoked in the platform (`certificates.revoked`), and the revocation is reported to IADC.

## 6. Records

| Record | Location | Retention |
|---|---|---|
| Registration, consent, identity verifications and photos | Server tables `trainees`, `events`; storage `idphotos` | ≥ 5 years |
| Training records: module start and end, active time, checks, practices | `progress`, `events` | ≥ 5 years |
| Assessments: questions, answers, scores | `exam_attempts`, `exam_bank` | ≥ 5 years |
| Certificates | `certificates` + IADC database | ≥ 5 years |
| Surveys, complaints and responses | `surveys`, `complaints` | ≥ 5 years |
| Rosters and exports | Monthly CSV and JSON exports in company storage | ≥ 5 years |

- **Security.** Learners can read only their own records (row-level security). The event log is append-only. Staff access requires an instructor or admin role, assigned only by the database administrator.
- **Backups.** The database is backed up daily by the server plan. Monthly exports are kept offline.
- **Disposal.** Records are not deleted before 5 years. After that, disposal follows the company data policy and Law 1581 of 2012.
- **Audit access.** IADC auditors receive read access to the platform (instructor role) and the course, as required by the eLearning agreement.

## 7. Change management and continuous improvement

1. **Content review.**
   - The QA Manager and a subject-matter instructor review all course content, assessments and delivery every {{6}} months.
   - Each review checks against current IADC program bulletins and curriculum updates, survey results, complaints, exam item statistics (items most often failed) and audit findings.
2. **Changes.**
   - Changes are documented in a change log: what changed, why, who approved, and the date.
   - Changes to title, description, level, scope or objectives require a new application (DIT-03).
   - Minor changes (contact, language, location, company name) are reported with DIT-03M or the RigPass modification form within 30 days.
   - Changes are communicated to instructors and support staff before release.
3. **Internal audits.**
   - Twice a year, the QA Manager samples at least 10 learner records per course: identity checks, active time against minimums, module order, exam security and certificate data.
   - Findings are recorded with corrective and preventive actions, an owner and a due date.
4. **Corrective actions on IADC audits** are answered within the deadline set by IADC.

## 8. Learner support

- **Live technical support:** {{hours, at least 12 hours per day for home-based delivery}}, by email {{…}}, phone {{…}} and WhatsApp {{…}}.
  - Target response: immediate during support hours by phone or WhatsApp; under 24 hours by email.
- **Approved instructor availability:** {{days and hours}}, with reliable contact details shown on the **Ayuda** screen.
- **FAQ** is available in the platform (**Ayuda y soporte**).
- **Quality Statement & Comment Policy.**
  - Every learner must accept it before starting a course, and it is always available on the **Ayuda** screen.
  - It includes the IADC contact addresses for quality comments.
  - {{Replace the provider text with the official IADC document from the provider resources if required.}}

## 9. Instructors

- **Minimum qualifications.**
  - At least 2 years in one of: HSE or petroleum industry experience; teaching or educational background; training or on-the-job instruction.
  - Preferred: HSE or petroleum experience plus training experience.
- **Approval and affiliation.** Instructors must be IADC-approved before acting for the program and may be affiliated with no more than 4 providers.
- **Records.** Instructor files (CV, evidence of experience, IADC approval, affiliation form) are kept by the administrator.
- **Evaluation.** Instructors are evaluated yearly using survey results, complaint records and internal audit samples.

## 10. Complaints

1. Learners submit complaints or comments from **Ayuda → Quejas y comentarios**, with or without a course reference.
2. The QA Manager acknowledges within {{2}} business days and responds in the platform. The learner sees the response and status: *abierta*, *en revisión* or *cerrada*.
3. Complaints are analysed in the content review (section 7). Complaints against the provider are resolved as required by IADC.

## 11. Promotion

- All DIT technical and promotional material includes: *"Content of the course is not vetted as part of the DIT accreditation"* (in Spanish: *"Contenido del curso no examinado por la IADC como parte de la acreditación DIT"*).
- Staff must not claim that courses grant competence, licenses, or certification beyond the IADC certificate of completion.
- The IADC logo is used only according to IADC guidelines.
