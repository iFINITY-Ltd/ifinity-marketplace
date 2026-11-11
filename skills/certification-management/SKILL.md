---
name: certification-management
description: >-
  Manage certification programs, CPD/CPE credits, and professional development in
  iMIS. This skill should be used when the user says "certification", "CPD",
  "CPE", "continuing education", "credits", "professional development",
  "enrol in program", "certification progress", "log experience", "CEU",
  "continuing professional development", or when working with certification
  programs, enrolments, or unit types. This skill records program
  registration directly and configures unit types; recording a member's
  CPD/experience credit is not available yet (the store is not mapped), and
  there is no automatic event-to-credit posting, so event registration and
  attendance belong to event-management.
argument-hint: "[member-name-or-id] [program-name]"
---

# Certification & Professional Development Management

Manage certification programs, enrolments, CPD/CPE credit tracking, and experience logging in iMIS.

## Key Concepts

- **CertificationProgram**: Defines a certification with requirements (components)
- **CertificationProgramComponent**: Individual requirements within a program (courses, exams, credits)
- **CertificationProgramRegistration**: Links a member to a program (enrolment)
- **ExperienceUnit**: A **unit type** (CPD, Credits, CEUs, Hours, CME…) that programs measure requirements in. It is tenant configuration with only `ExperienceUnitId`, `Name` and `Description`. It is **never** a member's credit: writing a credit there adds a blank unit type to the tenant's list.
- **A member's experience credits**: iMIS returns `UnitsEarned` and per-component rows (earned units, completion date) on each `CertificationProgramRegistration`. The store that holds a member's experience records is **not mapped yet**, so recording a credit is refused.

## Write gate

Every write is two-step: `preview_*` then `create_*` with the **verbatim** `confirmationText` the preview returned. The post-write readback confirms the row was written — it is **not** proof of a rendered transcript, an awarded credential, an expiry change, or any event-to-credit posting; verify those separately.

## Step 1: Understand the Request

Determine what the user needs:
- **Check programs**: List available certification programs → `imis_certification_program_catalog` with action "list"
- **Program details**: Get a specific program and its components → `imis_certification_program_catalog` with action "get"
- **Enrol member**: Register a member in a program → `imis_certification_transcript_records` (`preview_enrollment` → `create_enrollment`)
- **Check progress**: See what a member has completed → `imis_certification_transcript_profile`
- **Log credits**: Recording a member's CPD/CPE units is **not available yet**. `imis_certification_transcript_records` `preview_record_experience` / `record_experience` refuse with the reason and never write. Tell the person to record the experience in iMIS (the member's program enrollment, or the staff experience review list), then read it back with `imis_certification_transcript_profile`. Never create an `ExperienceUnit` for a member through `imis_certification_setup` or `imis_entity`.
- **Program/component/group/location definitions, unit types (`ExperienceUnit`), and bulk/non-Party registration fixes**: use `imis_certification_setup` (CertificationProgramSummary and ExperienceGrade are read-only); **a single member's enrolment**: use `imis_certification_transcript_records` — it adds Party/program preview context and transcript readback

## Step 2: Find the Member (if needed)

If the user references a member by name or email, use `imis_find_member` first to get their Party ID.

## Step 3: Execute

### List/Search Programs
```
imis_certification_program_catalog action="list"
imis_certification_program_catalog action="search" search="Project Management"
```

### Get Program Details (includes components/requirements)
```
imis_certification_program_catalog action="get" programId="PMP-2024"
```

### Enrol a Member
1. Check if already enrolled: `imis_certification_transcript_profile` partyId={id} programId={programId}
2. If not enrolled, two-step gated:
```
imis_certification_transcript_records action=preview_enrollment partyId={id} programId={programId}
imis_certification_transcript_records action=create_enrollment  partyId={id} programId={programId} confirmationText="<exact text from preview>"
```

### Check Progress
```
imis_certification_transcript_profile partyId="12345"
imis_certification_transcript_profile partyId="12345" programId="PMP-2024"
```

### Log CPD/CPE Credits (not available yet)
```
imis_certification_transcript_records action=record_experience partyId="12345"
```
answers `status: "blocked_member_experience_store_unmapped"` with the reason and a next step, and writes nothing. The member experience store is found by one watched native capture (catalogue row CRT-07); the writer is rebuilt on that store afterwards.

### Configure a Unit Type (tenant configuration, not a member's credit)
```
imis_certification_setup action=preview_create entity=ExperienceUnit payloadObject={"Name":"PDU","Description":"Professional Development Units"}
imis_certification_setup action=create entity=ExperienceUnit payloadObject={...same...} confirmationText="<exact text from preview>"
```
Only `ExperienceUnitId`, `Name` and `Description` are accepted; a payload naming a member, an offering, units or a date is refused before anything is sent.

## Step 4: Summarise

Present results clearly:
- For programs: Name, status, number of components, requirements
- For enrolments: Program name, enrolment date, components completed vs total
- For credits: units earned per registration and component as iMIS returns them, and a plain note that credits recorded outside a program enrollment may be missing while the member experience store is unmapped
