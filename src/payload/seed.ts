import type { Payload } from "payload";
import { defaultServices, ottawaCities, provincesSeed } from "@/lib/brand";
import { launchBrandSeedDefaults } from "@/lib/launch-brand";
import { textToLexical } from "@/lib/lexical-seed";

export async function seedDatabase(payload: Payload) {
  const { totalDocs: provinceCount } = await payload.count({
    collection: "provinces",
  });

  if (provinceCount > 0) {
    return;
  }

  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.totalDocs === 0) {
    try {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@jarkabi.ca",
          password: "ChangeMeNow123!",
          role: "super_admin",
          firstName: "Admin",
          lastName: "User",
        },
      });
      console.info("[seed] Created admin@jarkabi.ca — change password immediately.");
    } catch {
      console.info("[seed] Admin user already exists.");
    }
  }

  const brand = launchBrandSeedDefaults();
  await payload.updateGlobal({
    slug: "brand-settings",
    data: {
      agencyName: brand.agencyName,
      tagline: brand.tagline,
      email: brand.email,
      websiteUrl: brand.websiteUrl,
      primaryPhone: brand.primaryPhone,
      tollFreePhone: brand.tollFreePhone,
      businessHours: brand.businessHours,
      ottawaOfficeAddress: brand.ottawaOfficeAddress,
    },
  });

  const provinceIds: Record<string, number | string> = {};

  for (const province of provincesSeed) {
    const created = await payload.create({
      collection: "provinces",
      data: {
        name: province.name.en,
        slug: province.slug,
        code: province.code,
        status: province.status,
      },
    });
    provinceIds[province.slug] = created.id;
  }

  for (const citySlug of ottawaCities) {
    await payload.create({
      collection: "cities",
      data: {
        name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
        slug: citySlug,
        province: provinceIds.ontario,
        status: "active",
      },
    });
  }

  const serviceBlocks: Record<string, unknown[]> = {
    "personal-care": [
      {
        blockType: "richText",
        eyebrow: "Overview",
        headline: "Respectful support for daily routines",
        body:
          "Personal care helps individuals maintain comfort, dignity and independence with bathing, dressing, grooming and mobility support at home.",
      },
      {
        blockType: "processTimeline",
        headline: "How care begins",
        steps: [
          { title: "Talk with us", description: "Share your needs and preferences." },
          { title: "Care assessment", description: "We review health, routine and home context." },
          { title: "Personalized plan", description: "A plan shaped around the person, not the schedule." },
          { title: "Care begins", description: "Matched caregivers start with continuity in mind." },
        ],
      },
    ],
    "registered-nursing": [
      {
        blockType: "richText",
        eyebrow: "Clinical care",
        headline: "Professional nursing at home",
        body:
          "Registered nurses and registered practical nurses provide skilled clinical support at home — wound care, medication administration, catheter and ostomy support, and monitoring after a hospital stay — within the scope of practice set by their regulatory college.",
      },
      {
        blockType: "trustBar",
        items: [
          { label: "Professional oversight" },
          { label: "Continuity of care" },
          { label: "Family communication" },
        ],
      },
    ],
    "dementia-support": [
      {
        blockType: "richText",
        eyebrow: "Specialty care",
        headline: "Support rooted in familiarity and dignity",
        body:
          "Dementia support emphasizes routine, meaningful activity, caregiver consistency and respectful communication for individuals and families.",
      },
    ],
  };

  for (const service of defaultServices) {
    const created = await payload.create({
      collection: "services",
      data: {
        title: service.title.en,
        slug: service.slug,
        summary: service.summary.en,
        category: service.category,
        featured: service.featured,
        published: true,
        sortOrder: service.sortOrder,
        blocks: serviceBlocks[service.slug],
      },
    });

    await payload.create({
      collection: "service-availability",
      data: {
        service: created.id,
        province: provinceIds.ontario,
        status: "active",
      },
    });
  }

  await payload.create({
    collection: "blog-posts",
    data: {
      title: "Choosing Home Care in Ottawa",
      slug: "choosing-home-care-ottawa",
      excerpt: "A practical guide for families exploring home care options in the National Capital Region.",
      category: "Choosing Home Care",
      published: true,
      publishedAt: new Date().toISOString(),
    },
  });

  await payload.create({
    collection: "careers",
    data: {
      title: "Personal Support Worker — Ottawa",
      slug: "psw-ottawa",
      summary:
        "Support clients across Ottawa with personal care, companionship and help around the home. Consistent client assignments and coordinator support.",
      profession: "Personal Support Worker",
      employmentType: "Part-time",
      published: false,
    },
  });

  const legalPageSeeds = [
    {
      title: "Privacy Policy",
      slug: "privacy",
      body: "Our privacy practices are built around Canada's federal private-sector privacy law and the provincial health-information legislation that applies wherever we operate. Contact our care team with any question about how your information is handled.",
    },
    {
      title: "Terms of Use",
      slug: "terms",
      body: "Nothing on this website is medical advice, and the information here does not create a care relationship. Service availability differs by province and city, and only the communities listed as active on our locations page are served today.",
    },
    {
      title: "Accessibility",
      slug: "accessibility",
      body: "Jarkabi Home Care aims to meet WCAG 2.1 Level AA across this website. Accessibility matters more than usual here: many of our visitors are older adults, people with low vision, or families reading on a phone in a hospital corridor.",
    },
    {
      title: "Cookie Policy",
      slug: "cookies",
      body: "We use essential cookies to keep the site secure and working. Analytics or preference cookies, if added later, will be described here and managed through your browser settings. We do not sell personal information collected through cookies.",
    },
    {
      title: "Consent Information",
      slug: "consent",
      body: "Before care begins, we speak with the client or their authorized substitute decision-maker to confirm they understand the services proposed and agree to proceed. We document consent in line with applicable provincial requirements. Marketing contact is separate and always optional.",
    },
    {
      title: "Care Service Disclaimer",
      slug: "care-disclaimer",
      body: "Information on this website is general in nature and is not medical advice, diagnosis or treatment. Only a qualified healthcare provider who knows the individual's situation can give clinical guidance. Emergency symptoms require calling 911 or going to the nearest emergency department.",
    },
    {
      title: "Employment Privacy Notice",
      slug: "employment-privacy",
      body: "Application materials are used only to assess suitability for roles with Jarkabi Home Care, conduct reference and background checks where permitted, and communicate about hiring. We retain records according to our retention schedule and applicable employment and privacy law.",
    },
    {
      title: "Referral Privacy Notice",
      slug: "referral-privacy",
      body: "Referral information is shared only with staff who need it to respond to the referral, coordinate care, or meet legal obligations. We confirm client consent before collecting further clinical detail. Referrers should not send more identifying information than needed to start the conversation.",
    },
    {
      title: "Feedback & Complaints Policy",
      slug: "feedback-policy",
      body: "We welcome feedback by phone, email or our online form. Concerns are logged, reviewed by appropriate leadership, and answered within a reasonable timeframe. Serious clinical or safety issues are escalated immediately. This policy does not replace regulatory complaint processes available in your province.",
    },
  ] as const;

  for (const page of legalPageSeeds) {
    await payload.create({
      collection: "legal-pages",
      data: {
        title: page.title,
        slug: page.slug,
        body: textToLexical(page.body),
        published: true,
        reviewRequired: false,
      },
    });
  }

  console.info("[seed] National location and service data ready.");
}
