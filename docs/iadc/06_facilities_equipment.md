# Facilities, Equipment and Maintenance Plan

## Delivery options

1. **Home-based / own device.**
   - Learners take the course on their own computer, tablet or phone. They need a current Chrome, Edge or Safari, internet, audio, and a camera for identity verification.
   - Meta Quest 2/3/Pro headsets can be used for the 3D practices. Identity on the headset is verified with an instructor code.
2. **Provider location** ({{ADDRESS}}). Learners use the provider's equipment in a supervised room.

## Equipment list (provider location)

| Item | Qty | Purpose |
|---|---|---|
| Computers (Windows/macOS, 8 GB RAM, recent GPU), webcam, headset | {{n}} | Course delivery, identity verification |
| Meta Quest 3 headsets with controllers | {{n}} | Immersive 3D practices |
| Hygiene face covers / cleaning wipes | stock | Headset hygiene |
| Internet connection ≥ 20 Mbps | 1 | Platform access |
| UPS / power strips | {{n}} | Continuity |

## Platform infrastructure

- **Web application.** Static site on GitHub Pages (CDN). No installation is required.
- **Records server.** Supabase, a managed PostgreSQL database. It provides authentication, row-level security, private file storage for identity photos and daily backups.
- **Third-party libraries** are loaded from cdnjs and jsDelivr: three.js r128 and the QR code generator.

## Maintenance plan

| Check | Frequency | Responsible | Record |
|---|---|---|---|
| Computers boot, browser updated, platform loads, webcam and audio work | Before each session | Instructor | Equipment log |
| Headsets charged and clean, guardian set, controllers paired, platform loads in VR | Before each session | Instructor | Equipment log |
| Headset lens and foam replacement; firmware updates | Monthly | Technical support | Equipment log |
| Database backup verified; monthly export of records stored offline | Monthly | Administrator | Backup log |
| Platform functional test (create test learner, complete a module, exam on a test course, certificate verification) | After every release and quarterly | QA Manager | Release log |
| Review of server access roles (instructors/admins) | Quarterly | QA Manager | Access review log |

## Equipment log template

| Date | Item / ID | Check performed | OK / Issue | Action | Initials |
|---|---|---|---|---|---|
| | | | | | |
