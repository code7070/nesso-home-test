interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  email?: string;
  socialLinks?: string[];
}

export function OrganizationSchema({
  name = "Nesso Digitale Lab",
  url = "https://nessodigitale.com",
  logo = "https://nessodigitale.com/logo.png",
  email = "info@nessodigitale.com",
  socialLinks = [],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs: socialLinks,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
    },
  };

  return <JsonLdScript data={schema} />;
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
}

export function WebsiteSchema({
  name = "Nesso Digitale Lab",
  url = "https://nessodigitale.com",
}: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };

  return <JsonLdScript data={schema} />;
}

interface ProfessionalServiceSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
    postalCode?: string;
  };
  priceRange?: string;
}

export function ProfessionalServiceSchema({
  name = "Nesso Digitale Lab",
  description = "Creative digital agency specializing in web development and UI/UX design",
  url = "https://nessodigitale.com",
  email = "info@nessodigitale.com",
  priceRange = "$$",
}: ProfessionalServiceSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url,
    email,
    priceRange,
  };

  return <JsonLdScript data={schema} />;
}

// Combined schema for the landing page
export function LandingPageSchemas() {
  return (
    <>
      <OrganizationSchema
        socialLinks={[
          "https://facebook.com/nessodigitale",
          "https://twitter.com/nessodigitale",
          "https://instagram.com/nessodigitale",
        ]}
      />
      <WebsiteSchema />
      <ProfessionalServiceSchema />
    </>
  );
}

export default LandingPageSchemas;
