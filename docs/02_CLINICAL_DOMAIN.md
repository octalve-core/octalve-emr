# Phase C — Clinical Domain Contracts

## Product scope
Independent multi-facility outpatient EMR, initially general outpatient plus ophthalmology and dentistry. The first validated workflow is patient registration → booking/check-in → encounter → note → investigation or medication order → visit charge → follow-up. An appointment is not itself an encounter; an order is not a result; a charge is not proof of payment.

## Record boundaries
- Facility owns its patient master and clinical documents. Patient MRN must be unique **within a facility** and allocated transactionally in a real backend; demo MRNs are explicitly non-authoritative.
- Staff user belongs to a facility through time-bound membership; practitioner eligibility/licensure and specialisation require verification beyond mere role assignment.
- Patient registration supports duplicates, demographic corrections, patient merge/split governance and historical provenance. Avoid using phone number or name as a patient key.
- Appointment records a planned time, provider, service and location. Check-in changes operational status; it is not proof clinical consultation occurred. Live scheduling must consider provider hours, duration, rooms, absence, collisions and concurrency.
- Encounter starts clinical work. Encounters record responsible practitioner, time, reason, observations, orders, diagnoses and completion state.
- Clinical notes are drafts until a properly authenticated and authorised clinician signs. Signed notes are immutable; corrections require append-only amendments and relation to original version. Do not equate checking a UI box with a digital signature.
- Observations capture structured clinical measurement, unit, code, laterality, measurement time and author. Examples: blood pressure, visual acuity, intraocular pressure, refraction.
- Diagnostic order and diagnostic report must remain separate. Result verification, critical-value handling and order/result correlation require laboratory policy and vendor integration.
- Medication order requires verified prescriber, clinical appropriateness checks, dose/route/frequency, allergy review and signed prescribing workflow. No automated clinical advice in this demo.
- Dental findings need an explicit tooth-numbering standard; ophthalmology needs right/left laterality, device/source and clinically approved recording forms.
- Billing is a separate EMR module. A charge may be unpaid/paid according to a future EMR payment ledger; no Finance invoices are imported.
- Access to records, including **read and export**, must be audited according to privacy law and clinic policy.

## FHIR mapping target
**FHIR R4 (4.0.1) is a design target**, selected to align with the draft Nigeria Core guide. It is not yet a FHIR server and has not passed conformance checks.

| Native concept | FHIR R4 mapping candidate |
| --- | --- |
| Facility | Organization, Location |
| Staff clinician | Practitioner, PractitionerRole |
| Patient | Patient |
| Appointment | Appointment |
| Encounter | Encounter |
| Observations, eye measurements, vitals | Observation |
| Allergy | AllergyIntolerance |
| Diagnostic request | ServiceRequest |
| Diagnostic report | DiagnosticReport, Observation |
| Prescription | MedicationRequest |
| Stored clinical file | DocumentReference + Binary/Attachment patterns |
| Audit event | AuditEvent (specific local model) |

Research: https://hl7.org/fhir/R4/ ; https://github.com/digitalhealth-gov-ng/Nigeria-Core ; draft continuous build is version `0.0.0` and **not an authorised publication**. Adopt official stable Nigeria profiles only after validation.

## Production conditions still undecided
Real patient identifier policy, date of birth precision, legal consent, record retention, patient access/subject rights, local clinical codes and terminology licensing, clinician licensing, prescriptions, clinical documentation sign-off, dental chart standard, device integration, critical-result escalation, inter-facility referral and archival rules. These require domain expert sign-off.
