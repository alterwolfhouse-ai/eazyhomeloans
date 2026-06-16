# Eazy Home Loans Backend

Backend foundation for the Eazy Home Loans client project.

This is a service-led lead capture, eligibility guidance, loan-service inquiry,
and admin CRM backend. It is not a direct lending platform and does not include
payments, document uploads, bank integrations, bank logos, fixed rates, or any
unverified loan claims.

## Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Zod validation
- JWT admin authentication
- bcryptjs password hashing
- Swagger/OpenAPI docs
- Vitest

## Setup

```bash
cd backend
npm install
copy .env.example .env
```

Update `.env` with your PostgreSQL `DATABASE_URL`, JWT secret, and seed admin
credentials.

Run database migration and seed:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Start development server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:4000
```

Swagger docs are available at:

```text
http://localhost:4000/api/docs
```

## Verification

```bash
npm run typecheck
npm test
```

## Seeded Loan Services

- New Home Purchase Loan
- Home Construction Loan
- Plot Purchase + Construction Loan
- Home Loan Balance Transfer
- Top-Up Loan
- Home Renovation / Improvement Loan
- Home Extension Loan
- Loan Against Property
- NRI Home Loan
- Joint Home Loan
- Pre-Approved Home Loan
- Builder Project Loan Support

## Public API

### `GET /api/health`

Health check.

### `GET /api/brand`

Returns public-safe brand information seeded from the internal brand source:

- brand name
- purchased domain
- contact person
- phone
- WhatsApp URL
- address
- consent text
- estimate disclaimer

The raw internal source is not exposed through this endpoint.

### `GET /api/loan-services`

Returns active loan services for public forms and website content.

### `POST /api/leads`

Creates a qualified lead inquiry.

Minimum body:

```json
{
  "fullName": "Aarav Sharma",
  "phone": "9876543210",
  "city": "Mumbai",
  "serviceId": "service_id_from_api",
  "consentAccepted": true
}
```

Notes:

- `phone` must be a valid Indian mobile number.
- `consentAccepted` must be `true`.
- `employmentType` is optional for short website forms and defaults to `OTHER`.
- `consentText` is stored. If omitted, a safe default consent text is stored.
- Aadhaar, PAN, bank statements, salary slips, and property documents are not
  accepted or stored in phase 1.

### `POST /api/emi/calculate`

Calculates and stores an estimated EMI.

```json
{
  "principal": 5000000,
  "annualInterestRate": 9,
  "tenureYears": 20
}
```

### `POST /api/eligibility/check`

Creates a simple FOIR-style eligibility estimate.

```json
{
  "monthlyIncome": 85000,
  "existingEmi": 10000,
  "requestedLoanAmount": 5000000,
  "tenureYears": 20,
  "annualInterestRate": 9
}
```

The response always includes:

```text
This is an estimate only and does not guarantee loan approval. Final eligibility, rate, and approval depend on the lender's policy and verification.
```

## Admin API

Admin routes require:

```text
Authorization: Bearer <jwt_token>
```

except login.

### `POST /api/admin/auth/login`

Logs in a seeded or existing admin user.

```json
{
  "email": "admin@eazyhomeloans.local",
  "password": "ChangeMe123!"
}
```

### `GET /api/admin/me`

Returns the current admin user.

### `GET /api/admin/leads`

Lists leads with optional filters:

- `page`
- `limit`
- `status`
- `serviceId`
- `assignedToId`
- `source`

### `GET /api/admin/leads/:id`

Returns full lead details, including notes, status history, eligibility checks,
loan service, and assigned admin.

### `PATCH /api/admin/leads/:id/status`

Updates lead status and records status history.

```json
{
  "status": "CONTACTED"
}
```

### `PATCH /api/admin/leads/:id/assign`

Assigns or unassigns a lead.

```json
{
  "adminUserId": "admin_user_id"
}
```

To unassign:

```json
{
  "adminUserId": null
}
```

### `POST /api/admin/leads/:id/notes`

Adds a note to a lead.

```json
{
  "note": "Customer requested callback tomorrow morning."
}
```

### `GET /api/admin/loan-services`

Lists all loan services, active and inactive.

### `POST /api/admin/loan-services`

Creates a loan service.

```json
{
  "name": "Example Loan Service",
  "description": "Admin-controlled service description.",
  "displayOrder": 20,
  "isActive": true
}
```

### `PATCH /api/admin/loan-services/:id`

Updates loan service content, ordering, slug, or active state.

### `DELETE /api/admin/loan-services/:id`

Soft-disables a loan service by setting `isActive` to `false`.

## Compliance Notes

- Do not claim guaranteed approval.
- Do not hardcode public interest-rate claims.
- Do not collect sensitive documents in phase 1.
- Do not use bank/NBFC logos or partner names without verification and approval.
- EMI and eligibility APIs are estimates only.
- Final lender terms depend on lender policy and verification.
