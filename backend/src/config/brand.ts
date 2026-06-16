import { DEFAULT_CONSENT_TEXT, ESTIMATE_DISCLAIMER } from "../modules/consent/consent.constants";

export const brand = {
  name: "Eazy Home Loans",
  domain: "eazyhomeloans.in",
  websiteUrl: "https://eazyhomeloans.in",
  contactPerson: "Niteen Sharma",
  phone: "+91 92170 37064",
  phoneHref: "tel:+919217037064",
  whatsappUrl:
    "https://wa.me/919217037064?text=Hi%2C%20I%20want%20guidance%20for%20a%20home%20loan.",
  email: "hello@eazyhomeloans.in",
  address: "Shop No. 5, JS Plaza, Harsh Vihar Road, 201009",
  positioning:
    "Home-loan guidance and assistance service. Not a direct lender, bank, or NBFC.",
  consentText: DEFAULT_CONSENT_TEXT,
  estimateDisclaimer: ESTIMATE_DISCLAIMER
} as const;
