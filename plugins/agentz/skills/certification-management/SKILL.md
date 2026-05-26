---
name: certification-management
description: >-
  Manage certification programs, CPD/CPE credits, and professional development in
  iMIS. This skill should be used when the user says "certification", "CPD",
  "CPE", "continuing education", "credits", "professional development",
  "enrol in program", "certification progress", "log experience", "CEU",
  "continuing professional development", or when working with certification
  programs, enrolments, or experience units.
argument-hint: "[member-name-or-id] [program-name]"
---

# Certification & Professional Development Management

Manage certification programs, enrolments, CPD/CPE credit tracking, and experience logging in iMIS.

## Key Concepts

- **CertificationProgram**: Defines a certification with requirements (components)
- **CertificationProgramComponent**: Individual requirements within a program (courses, exams, credits)
- **CertificationProgramRegistration**: Links a member to a program (enrolment)
- **ExperienceUnit**: A record of CPD/CPE credits earned for an activity
- **ExperienceOffering**: The course/activity that grants credits

## Step 1: Understand the Request

Determine what the user needs:
- **Check programs**: List available certification programs → `imis_certification_programs` with action "list"
- **Program details**: Get a specific program and its components → `imis_certification_programs` with action "get"
- **Enrol member**: Register a member in a program → `imis_certification_enroll`
- **Check progress**: See what a member has completed → `imis_certification_progress`
- **Log credits**: Record CPD/CPE units earned → `imis_log_experience`

## Step 2: Find the Member (if needed)

If the user references a member by name or email, use `imis_find_member` first to get their Party ID.

## Step 3: Execute

### List/Search Programs
```
imis_certification_programs action="list"
imis_certification_programs action="search" search="Project Management"
```

### Get Program Details (includes components/requirements)
```
imis_certification_programs action="get" programId="PMP-2024"
```

### Enrol a Member
1. Check if already enrolled: `imis_certification_progress` partyId={id} programId={programId}
2. If not enrolled: `imis_certification_enroll` partyId={id} programId={programId}

### Check Progress
```
imis_certification_progress partyId="12345"
imis_certification_progress partyId="12345" programId="PMP-2024"
```

### Log CPD/CPE Credits
```
imis_log_experience partyId="12345" offeringId="COURSE-101" units=5.0
```

## Step 4: Summarise

Present results clearly:
- For programs: Name, status, number of components, requirements
- For enrolments: Program name, enrolment date, components completed vs total
- For credits: Units logged, offering name, date, running total
