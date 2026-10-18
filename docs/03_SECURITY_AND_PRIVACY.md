# Phase D — Security, Privacy and Persistence Gates (NOT IMPLEMENTED)

Healthcare PHI must not be stored in the existing client-only preview or sent to its disabled APIs. All fixtures are invented and remain in browser memory. Production requires evidence-based clinical safety and security assessment.

## Mandatory controls before real data
1. NDPA 2023 + applicable NDPC implementing guidance analysis; identify controller, processor, lawful basis for health data and privacy notice; undertake appropriate privacy impact assessment and data-processing contracts. Healthcare confidentiality obligations may apply beyond general data protection.
2. Real identity: verified staff invitations, secure session cookies, MFA/step-up for privileged operations, session expiry and revocation, prevention of staff role escalation, offboarding.
3. Authorisation: deny by default; check facility membership, role, patient relationship, purpose and record sensitivity on **every** read/write/export/API call; database-level composite foreign keys, tenant isolation and BOLA tests. URL ids and client roles are never authority.
4. Access audit: access reads, exports, create/edit, signatures, patient merges, emergency override, denial events; log minimal data without patient details. Tamper-evident append-only ingestion, secure retention, monitoring.
5. Signed clinical documents: server-calculated document version hashes and verified clinician identity at signing; amend rather than overwrite; require note-history retention.
6. Private storage: encrypted documents/attachments, least privilege, content-type and malware scans, short-lived authorised retrieval, no static public clinical documents. Distinct production databases and storage accounts from Finance.
7. Key management: server-side secrets and envelope encryption with external KMS/HSM; rotation, environment separation, secure backups and tested restoration; encrypt sensitive columns where justified.
8. Provider and dependency supply-chain controls: verified commits/lockfiles, SBOM, security updates, CI scanning, secret scanning, no user data in analytics, observability, error reports or AI services.
9. Clinical governance: consent and disclosure auditing, break-glass controls with reason, notification and retrospective review, retention/legal-hold policies and corrected records.
10. Tests: OWASP ASVS risk-appropriate controls, cross-tenant/BOLA regression, escalation attempts, SSRF/file attacks, CSRF, XSS, SQL injection, appointment concurrency, record-signing integrity, backup restoration, accessibility and clinical acceptance.

## Development state
- `src/server/authorization.ts` intentionally rejects every clinical access request.
- `/api/v1/patients` and `/api/v1/appointments` return HTTP 503 for both GET and POST.
- `/api/health` reports preview mode only; never includes personal details.
- `prisma/schema.prisma` is a **proposed** schema; not migrated or validated with Prisma CLI. It is not proof of tenant isolation, encryption correctness or compliance.

## References
- https://ndpc.gov.ng/ (NDPC)
- https://owasp.org/www-project-application-security-verification-standard/
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- https://hl7.org/fhir/R4/security.html
