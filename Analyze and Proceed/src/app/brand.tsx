export const BRAND = {
  name: "Eazy Home Loans",
  legacyName: "Easy Home Loans",
  tagline: "Home Loans Made Easier, Faster & Clearer",
  domain: "eazyhomeloans.in",
  websiteUrl: "https://eazyhomeloans.in",
  contactPerson: "Niteen Sharma",
  phoneDisplay: "+91 92170 37064",
  whatsappNumber: "919217037064",
  phoneHref: "tel:+919217037064",
  whatsappUrl:
    "https://wa.me/919217037064?text=Hi%2C%20I%20want%20guidance%20for%20a%20home%20loan.",
  email: "hello@eazyhomeloans.in",
  addressShort: "Shop No. 5, JS Plaza, Harsh Vihar Road, 201009",
  addressFull: "Shop No. 5, JS Plaza, Harsh Vihar Road, Ghaziabad, UP 201009",
  consentText:
    "I agree to be contacted by Eazy Home Loans for loan guidance. I understand this does not guarantee loan approval.",
  disclaimer:
    "This is an estimate only and does not guarantee loan approval. Final eligibility, rate, and approval depend on the lender's policy and verification."
} as const;

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function BrandWordmark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={light ? "text-white" : ""}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      Eazy <span style={{ color: "#C8961E" }}>Home Loans</span>
    </span>
  );
}
