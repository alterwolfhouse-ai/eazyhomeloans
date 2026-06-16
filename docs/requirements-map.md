# Eazy Home Loans - Requirements Map

This document absorbs the current Figma/design export in `Analyze and Proceed`
into the product and backend requirements for Eazy Home Loans.

## Source Design

- Folder: `Analyze and Proceed`
- Figma source noted in design export:
  `https://www.figma.com/design/e8egRVCpIwG7UUvKBoCLUT/Analyze-and-Proceed`
- Product brief:
  internal source notes kept outside the public repository
- Design guidelines:
  `Analyze and Proceed/guidelines/Guidelines.md`
- Brand source:
  public-safe constants only; raw brand notes stay internal
- Main UI prototype:
  `Analyze and Proceed/src/app/App.tsx`

## Brand Positioning

Eazy Home Loans is a trusted Indian home-loan assistance brand.
It is not a bank, NBFC, or direct lender.

Core promise:

"Make your home loan journey easier with expert support from eligibility to
disbursement."

Confirmed domain:

- `eazyhomeloans.in`

The backend and frontend must both preserve this stance:

- Guidance service, not direct lending.
- No guaranteed approval.
- No fake or hardcoded interest-rate claims.
- No lowest-rate or instant-approval claims.
- EMI and eligibility outputs are estimates only.
- All public lead forms require consent.
- No document upload in phase 1.

## Design System Notes

Visual stance:

- Premium Indian fintech
- Human, clean, professional
- Trust-first and family-friendly
- Structured whitespace and clear hierarchy

Design tokens from the export:

- Primary: `#1B3A8A`
- Accent: `#16A34A`
- Background: `#F7F8FC`
- Card: `#ffffff`
- Foreground: `#1A1F36`
- Muted foreground: `#5A6490`
- Secondary surface: `#EEF2FF`

Typography:

- Headings: Plus Jakarta Sans
- Body/UI: Inter
- Data/labels: DM Mono

## Frontend Screens In Design

1. Homepage
   - Hero CTA
   - Quick lead form
   - Loan services section
   - Why choose us
   - Four-step process
   - EMI calculator preview
   - Eligibility guidance
   - FAQ
   - Final CTA

2. Loan Services Page
   - Cards for all major loan service types.
   - CTA: Get Guidance.

3. Eligibility Check Page
   - Multi-step form.
   - Personal details.
   - Loan requirement.
   - Income details.
   - Consent and disclaimer.
   - Result screen that says request received, not approved.

4. EMI Calculator Page
   - Loan amount.
   - Annual interest rate.
   - Tenure.
   - Estimated EMI, total interest, total payment.
   - Disclaimer.

5. Contact / Lead Capture Page
   - Short lead form.
   - WhatsApp CTA.
   - Call CTA.
   - Business hours and service area placeholders.

6. Admin Dashboard Preview
   - Login screen.
   - Dashboard cards.
   - Leads table.
   - Lead detail.
   - Notes.
   - Status timeline.
   - Status update.
   - Assignment.

7. Privacy / Disclaimer Page
   - Privacy notice.
   - Consent language.
   - Financial disclaimer.
   - No guaranteed approval statement.
   - Data usage explanation.

## Backend Alignment

The current backend already supports the design's main integration points:

- `GET /api/loan-services`
- `POST /api/leads`
- `POST /api/emi/calculate`
- `POST /api/eligibility/check`
- `POST /api/admin/auth/login`
- `GET /api/admin/me`
- `GET /api/admin/leads`
- `GET /api/admin/leads/:id`
- `PATCH /api/admin/leads/:id/status`
- `PATCH /api/admin/leads/:id/assign`
- `POST /api/admin/leads/:id/notes`
- `GET /api/admin/loan-services`
- `POST /api/admin/loan-services`
- `PATCH /api/admin/loan-services/:id`
- `DELETE /api/admin/loan-services/:id`

## Design-To-API Mapping

### Homepage Quick Lead Form

Design fields:

- Name
- Phone
- City
- Loan Type
- Consent

Backend route:

- `POST /api/leads`

Backend mapping:

- `name` -> `fullName`
- `phone` -> `phone`
- `city` -> `city`
- `loanType` -> selected `serviceId` from `GET /api/loan-services`
- `consent` -> `consentAccepted`
- `source` -> `WEBSITE`
- `employmentType` -> defaults to `OTHER` if not collected

### Contact Form

Design fields:

- Full Name
- Phone Number
- Email optional
- City
- Service Required
- Message
- Consent

Backend route:

- `POST /api/leads`

Backend mapping:

- `service` must resolve to `serviceId`
- `message` maps directly
- `email` is optional
- `employmentType` defaults to `OTHER` if not collected

### Eligibility Form

Recommended integration:

1. Create lead with `POST /api/leads`.
2. Use returned lead `id`.
3. Call `POST /api/eligibility/check` with `leadId`.

This keeps customer inquiry and estimate history connected in admin CRM.

### EMI Calculator

Design route:

- EMI Calculator Page

Backend route:

- `POST /api/emi/calculate`

Inputs:

- `principal`
- `annualInterestRate`
- `tenureYears`

Output:

- `monthlyEmi`
- `totalInterest`
- `totalPayment`
- `disclaimer`

### Admin Dashboard

Design feature:

- Login screen

Backend route:

- `POST /api/admin/auth/login`

Design feature:

- Dashboard lead table

Backend route:

- `GET /api/admin/leads`

Design feature:

- Lead detail

Backend route:

- `GET /api/admin/leads/:id`

Design feature:

- Change status

Backend route:

- `PATCH /api/admin/leads/:id/status`

Design feature:

- Add note

Backend route:

- `POST /api/admin/leads/:id/notes`

Design feature:

- Assign team member

Backend route:

- `PATCH /api/admin/leads/:id/assign`

## Current Integration Gaps

These are not blockers for phase 1, but they should be planned:

- The design uses display labels like `New`, `Contacted`, and `Follow Up`; the
  backend uses enum values like `NEW`, `CONTACTED`, and `FOLLOW_UP`. The frontend
  should map display labels to API enum values.
- The design dashboard shows summary cards. The frontend can calculate these
  from `GET /api/admin/leads` initially; a future backend stats endpoint can be
  added if needed.
- The design uses placeholder WhatsApp number, email, business hours, and
  service areas. These should become admin-controlled content or environment
  configuration before launch.
- The design includes legal copy placeholders. Final privacy and disclaimer text
  should be approved by the client before launch.
- The design currently works as a local React prototype with mock admin data.
  Production frontend should replace local mock state with backend API calls.

## Backend Adjustment Made From Design

The backend now allows short lead forms by defaulting missing `employmentType`
to `OTHER`. This keeps the homepage and contact-page lead forms compatible with
the current design while still storing a valid lead record.

## Phase 1 Product Boundary

Included:

- Lead capture
- Consent storage
- Loan service listing
- EMI estimate
- Eligibility estimate
- Admin login
- Lead list/detail
- Status update
- Assignment
- Notes
- Admin-controlled loan services

Excluded:

- Payment gateway
- Customer login
- Document upload
- Aadhaar/PAN/salary-slip/property-paper storage
- Bank/NBFC integration
- Bank logos
- Guaranteed approval or rate claims
