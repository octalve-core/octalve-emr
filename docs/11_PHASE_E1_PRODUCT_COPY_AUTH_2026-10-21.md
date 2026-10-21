# Octalve EMR — Phase E1 Batch 05: Production-quality copy, single-logo auth

**Approved by owner:** 21 October 2026. **Scope:** UI copy, presentation and browser checks, `octalve-core/octalve-emr` only.

## Final replacement copy: page and section contract

| Area | Heading | Final supporting copy |
| --- | --- | --- |
| Login | Welcome back | Sign in to manage your clinic operations. |
| Signup | Create your clinic account | Set up your clinic workspace in minutes. |
| Login/signup dark panel | Manage care with clarity. | Patients, appointments and clinical work in one place. |
| Overview | Clinical overview | Your clinic at a glance. |
| Patients | Patients | Manage patient records and profiles. |
| Appointments | Appointments | Manage schedules, arrivals and check-ins. |
| Encounters | Clinical encounters | Manage consultations and clinical notes. |
| Laboratory | Laboratory & diagnostics | Track diagnostic requests and results. |
| Eye care | Ophthalmology | Eye examinations and care plans. |
| Dental care | Dental care | Dental examinations and treatment plans. |
| Billing | Clinic billing | Manage service charges and balances. |
| Reports | Clinical reports | Activity and operational insights. |
| Settings | Clinic settings | Manage facility information and preferences. |
| Patient record | Patient record | Patient history and clinical information. |
| Profile | Account & profile | Staff information and account settings. |
| More | More | Your clinic workspaces and settings. |

## Panel and microcopy map

- Overview: **Visit activity — Visit trends**; **Activity timeline — Recent updates**; **Upcoming appointments — Appointment schedule**; **Quick access — Frequently used clinical workspaces**.
- Patient directory: record count only; search and department filter preserved. Empty state: **No patients match your search.**
- Appointment schedule: **Manage appointments and arrivals**; confirmed appointment still exposes **Review check-in** and dedicated record.
- Encounters: **Consultation records and notes**. Note signing unavailable until server authority; an unsigned draft is not a signed note.
- Laboratory: **Diagnostic requests and status**; release and verified results remain disabled.
- Eye/Dental: **Examination workspaces**; specialist recording forms remain gated.
- Billing: **Service charges and balances**; no payment settlement capability implied.
- Reports: **Data governance** replaces an implementation-plan heading; metrics are **sample** values, not live clinical reporting.
- Settings: **Facility details**; **Staff directory**; edit fields stay read-only and staff access remains unavailable.
- Profile: concise account copy; sample facility and inactive security correctly indicated.
- Detail/edit pages: short **Sample record** label; one actionable permission/error sentence instead of repeated long banners; no signed note alteration.
- Auth: one official wordmark plus EMR product name, no extra icon next to it; a single short H1 and one short paragraph in the dark panel, with no bullet-feature wall or borrowed Finance runtime.
- Auth entry: **Explore sample workspace**. Login and signup controls stay **disabled** until safe identity activation.

## UI implementation checklist

- [x] Single wordmark treatment in reusable `EmrBrand`, compact icon available only where explicitly requested
- [x] Simplified desktop auth panel; one heading and paragraph, restrained Octalve navy/blue
- [x] Removed redundant sign-in/signup prototype banners; retained concise account-unavailable indication
- [x] Removed repeated global clinical demonstration banner; discreet **Sample workspace** status retained
- [x] Replaced customer-facing copy across dashboard, patients, appointments, encounters, laboratory, eye care, dental, billing, reports, settings, profile, More and record pages
- [x] Preserved actual functionality, mock data boundaries and deny-by-default clinical APIs
- [x] Extended the **same** browser walkthrough to login and signup at 320, 390, 768 and 1440 pixels, starting only at entry `/`
- [ ] Source guards and full Review CI evidence at exact final commit
- [ ] Protected Vercel Review deployment and owner visual acceptance
- [ ] Owner-authorised production release

## Necessary truth preserved without UI clutter

This is still a sample workspace, not a secure, deployed clinical backend. The disabled auth forms accept no credentials; records remain invented, browser-memory only; patient/appointment APIs continue returning 503. Real health information must not be entered. There is no clinical signature, result-release, data privacy compliance certification, MFA, secure database or clinical encounter authority. These remain later implementation gates.

`review/emr` may receive the fully qualified batch, but **do not merge `main` without explicit owner approval.**
