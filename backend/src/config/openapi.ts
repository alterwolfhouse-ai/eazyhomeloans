export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Eazy Home Loans Backend API",
    version: "0.1.0",
    description:
      "Lead capture, eligibility guidance, EMI estimate, and admin CRM APIs for Eazy Home Loans."
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local development"
    }
  ],
  tags: [
    { name: "Health" },
    { name: "Brand" },
    { name: "Loan Services" },
    { name: "Leads" },
    { name: "EMI" },
    { name: "Eligibility" },
    { name: "Admin Auth" },
    { name: "Admin Leads" },
    { name: "Admin Loan Services" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      ApiResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { type: "object" },
          error: { type: "object" }
        }
      },
      LeadCreateInput: {
        type: "object",
        required: ["fullName", "phone", "city", "employmentType", "serviceId", "consentAccepted"],
        properties: {
          fullName: { type: "string", example: "Aarav Sharma" },
          phone: { type: "string", example: "9876543210" },
          email: { type: "string", example: "aarav@example.com" },
          city: { type: "string", example: "Mumbai" },
          state: { type: "string", example: "Maharashtra" },
          employmentType: {
            type: "string",
            enum: ["SALARIED", "SELF_EMPLOYED", "BUSINESS_OWNER", "PROFESSIONAL", "OTHER"]
          },
          monthlyIncome: { type: "number", example: 85000 },
          loanAmountRequired: { type: "number", example: 5000000 },
          propertyValue: { type: "number", example: 7500000 },
          existingLoan: { type: "boolean", example: false },
          existingBank: { type: "string", example: "Example Bank" },
          serviceId: { type: "string" },
          message: { type: "string" },
          source: {
            type: "string",
            enum: ["WEBSITE", "WHATSAPP", "INSTAGRAM", "FACEBOOK", "GOOGLE_ADS", "REFERRAL", "OTHER"]
          },
          consentAccepted: { type: "boolean", example: true },
          consentText: { type: "string" }
        }
      },
      EmiInput: {
        type: "object",
        required: ["principal", "annualInterestRate", "tenureYears"],
        properties: {
          principal: { type: "number", example: 5000000 },
          annualInterestRate: { type: "number", example: 9 },
          tenureYears: { type: "number", example: 20 }
        }
      },
      EligibilityInput: {
        type: "object",
        required: ["monthlyIncome", "requestedLoanAmount", "tenureYears"],
        properties: {
          leadId: { type: "string" },
          monthlyIncome: { type: "number", example: 85000 },
          existingEmi: { type: "number", example: 10000 },
          requestedLoanAmount: { type: "number", example: 5000000 },
          tenureYears: { type: "number", example: 20 },
          annualInterestRate: { type: "number", example: 9 }
        }
      }
    }
  },
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: { "200": { description: "Server is healthy" } }
      }
    },
    "/api/brand": {
      get: {
        tags: ["Brand"],
        summary: "Return public-safe brand information",
        responses: { "200": { description: "Brand information returned" } }
      }
    },
    "/api/loan-services": {
      get: {
        tags: ["Loan Services"],
        summary: "List active public loan services",
        responses: { "200": { description: "Loan services returned" } }
      }
    },
    "/api/leads": {
      post: {
        tags: ["Leads"],
        summary: "Create a public lead inquiry",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LeadCreateInput" } } }
        },
        responses: { "201": { description: "Lead created" } }
      }
    },
    "/api/emi/calculate": {
      post: {
        tags: ["EMI"],
        summary: "Calculate estimated EMI",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/EmiInput" } } }
        },
        responses: { "201": { description: "EMI estimate returned" } }
      }
    },
    "/api/eligibility/check": {
      post: {
        tags: ["Eligibility"],
        summary: "Create a basic FOIR-style eligibility estimate",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/EligibilityInput" } } }
        },
        responses: { "201": { description: "Eligibility estimate returned" } }
      }
    },
    "/api/admin/auth/login": {
      post: {
        tags: ["Admin Auth"],
        summary: "Admin login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" }
                }
              }
            }
          }
        },
        responses: { "200": { description: "JWT token returned" } }
      }
    },
    "/api/admin/me": {
      get: {
        tags: ["Admin Auth"],
        security: [{ bearerAuth: [] }],
        summary: "Return authenticated admin profile",
        responses: { "200": { description: "Admin returned" } }
      }
    },
    "/api/admin/leads": {
      get: {
        tags: ["Admin Leads"],
        security: [{ bearerAuth: [] }],
        summary: "List CRM leads",
        responses: { "200": { description: "Lead list returned" } }
      }
    },
    "/api/admin/leads/{id}": {
      get: {
        tags: ["Admin Leads"],
        security: [{ bearerAuth: [] }],
        summary: "Get lead details",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Lead returned" } }
      }
    },
    "/api/admin/leads/{id}/status": {
      patch: {
        tags: ["Admin Leads"],
        security: [{ bearerAuth: [] }],
        summary: "Update lead status and create history",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Lead status updated" } }
      }
    },
    "/api/admin/leads/{id}/assign": {
      patch: {
        tags: ["Admin Leads"],
        security: [{ bearerAuth: [] }],
        summary: "Assign or unassign lead",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Lead assignment updated" } }
      }
    },
    "/api/admin/leads/{id}/notes": {
      post: {
        tags: ["Admin Leads"],
        security: [{ bearerAuth: [] }],
        summary: "Add lead note",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "201": { description: "Note added" } }
      }
    },
    "/api/admin/loan-services": {
      get: {
        tags: ["Admin Loan Services"],
        security: [{ bearerAuth: [] }],
        summary: "List all loan services",
        responses: { "200": { description: "Loan services returned" } }
      },
      post: {
        tags: ["Admin Loan Services"],
        security: [{ bearerAuth: [] }],
        summary: "Create loan service",
        responses: { "201": { description: "Loan service created" } }
      }
    },
    "/api/admin/loan-services/{id}": {
      patch: {
        tags: ["Admin Loan Services"],
        security: [{ bearerAuth: [] }],
        summary: "Update loan service",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Loan service updated" } }
      },
      delete: {
        tags: ["Admin Loan Services"],
        security: [{ bearerAuth: [] }],
        summary: "Soft-disable loan service",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Loan service disabled" } }
      }
    }
  }
} as const;
