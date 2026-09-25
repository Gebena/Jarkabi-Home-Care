/**
 * Care Giver template demo content used when Payload CMS collections are empty.
 * Licensed imagery paths come from `caregiver-assets.ts`. Copy is adapted for
 * Jarkabi — replace with verified CMS records before launch.
 */

import {
  caregiverAuthorImages,
  caregiverBlogImages,
  caregiverTeamImages,
} from "@/lib/caregiver-assets";
import type { BlogPostData, FaqData, TeamMemberData, TestimonialData } from "@/lib/cms";

const demoTeamSeed = [
  { name: "Sarah Mitchell", role: "Care Coordinator", bio: "Coordinates assessments and care plans for Ottawa families." },
  { name: "James Chen", role: "Registered Practical Nurse", bio: "Clinical oversight for complex home care needs." },
  { name: "Amelia O'Brien", role: "Personal Support Worker", bio: "Personal care and companionship with eight years of experience." },
  { name: "David Okonkwo", role: "Health Care Aide", bio: "Mobility support, meal preparation and daily living assistance." },
  { name: "Priya Sharma", role: "Care Coordinator", bio: "Family communication and scheduling across bilingual households." },
  { name: "Michael Tremblay", role: "Registered Nurse", bio: "Skilled nursing visits and care plan review." },
  { name: "Elena Vasquez", role: "Personal Support Worker", bio: "Dementia-friendly routines and meaningful engagement." },
  { name: "Robert Kim", role: "Clinical Lead", bio: "Quality assurance and caregiver training." },
] as const;

export const demoTeamMembers: TeamMemberData[] = demoTeamSeed.map((member, index) => ({
  ...member,
  photo: caregiverTeamImages[index % caregiverTeamImages.length],
}));

export const demoTestimonials: TestimonialData[] = [
  {
    quote:
      "After my mother's hospital stay, Jarkabi coordinated nursing visits and personal care so she could recover at home. The team kept us informed every step of the way.",
    attribution: "Jennifer L.",
    relation: "Daughter — Ottawa",
    photo: caregiverAuthorImages[0],
  },
  {
    quote:
      "We needed respite care while I recovered from surgery. The caregiver matched our father's routines and language preferences — it made an difficult month manageable.",
    attribution: "Ahmed R.",
    relation: "Son — Kanata",
    photo: caregiverAuthorImages[1],
  },
  {
    quote:
      "The assessment was thorough and honest about what was realistic. No pressure, no vague promises — just a clear plan we could share with our family doctor.",
    attribution: "Margaret T.",
    relation: "Client — Nepean",
    photo: caregiverAuthorImages[0],
  },
  {
    quote:
      "Dementia care requires consistency. Having the same two caregivers each week gave my husband familiarity he needed, and gave me confidence to leave the house again.",
    attribution: "Helen W.",
    relation: "Spouse — Orleans",
    photo: caregiverAuthorImages[1],
  },
];

export const demoFaqs: FaqData[] = [
  {
    question: "How do I know if home care is the right choice?",
    answer:
      "Home care suits people who want to stay in familiar surroundings but need help with daily tasks, clinical support, or companionship. A free consultation helps clarify whether home care, community programs, or a combination fits best.",
    category: "Getting started",
  },
  {
    question: "What happens during the first consultation?",
    answer:
      "A care coordinator learns about health needs, daily routines, language and cultural preferences, and family goals. If you proceed, we schedule an in-home assessment and draft a written care plan before the first visit.",
    category: "Getting started",
  },
  {
    question: "Are your caregivers screened and insured?",
    answer:
      "Yes. Every caregiver completes reference checks and a vulnerable sector criminal record check before their first shift. Jarkabi carries liability insurance; credentials are verified against issuing colleges or training providers.",
    category: "Safety",
  },
  {
    question: "Can care be provided in languages other than English?",
    answer:
      "We match caregivers by language where possible. French, Tigrinya, Amharic and Arabic speakers are available depending on schedule and community — tell us your preference during the consultation.",
    category: "Care matching",
  },
  {
    question: "How quickly can care begin?",
    answer:
      "Simple companion or personal care often starts within a few days once a plan is agreed. Clinical or post-hospital care may need longer to match the right nurse and confirm orders from your healthcare team.",
    category: "Getting started",
  },
  {
    question: "Do you provide nursing care at home?",
    answer:
      "Registered nurses and registered practical nurses provide skilled nursing where appropriate and within scope. Nursing services are coordinated with physicians and documented in the care plan.",
    category: "Clinical care",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Jarkabi currently serves Ottawa and surrounding communities in Ontario. Use our locations page or call the care team to confirm service in your neighbourhood.",
    category: "Locations",
  },
  {
    question: "How is billing handled?",
    answer:
      "Rates depend on the type and frequency of care. You receive a written quote before care begins. Private pay, insurance where applicable, and provincial programs may apply — we explain options during consultation.",
    category: "Billing",
  },
];

export const demoBlogPosts: BlogPostData[] = [
  {
    slug: "magic-of-quality-home-care",
    title: "The difference quality home care makes",
    excerpt:
      "What families notice in the first month — consistency, communication, and care that respects the person, not just the task list.",
    category: "Choosing Home Care",
    publishedAt: "2025-11-12T12:00:00.000Z",
    image: caregiverBlogImages[0],
  },
  {
    slug: "caregiver-tips-during-holidays",
    title: "Five tips for caregivers during the holidays",
    excerpt:
      "Practical ways to reduce stress, keep routines manageable, and ask for help before burnout sets in.",
    category: "Family Caregiver Support",
    publishedAt: "2025-10-28T12:00:00.000Z",
    image: caregiverBlogImages[1],
  },
  {
    slug: "nationally-endorsed-care-standards",
    title: "What nationally endorsed care standards mean for your family",
    excerpt:
      "How accreditation, supervision, and documented care plans protect clients and give families clear expectations.",
    category: "Senior Health & Well-Being",
    publishedAt: "2025-10-05T12:00:00.000Z",
    image: caregiverBlogImages[2],
  },
  {
    slug: "food-safety-dining-solo",
    title: "Food safety when an older adult eats alone",
    excerpt:
      "Simple kitchen habits that reduce spoilage risk, support nutrition, and make mealtimes safer for seniors living independently.",
    category: "Senior Health & Well-Being",
    publishedAt: "2025-09-18T12:00:00.000Z",
    image: caregiverBlogImages[3],
  },
];

export type ServiceDetailDemo = {
  tagline: string;
  paragraphs: string[];
  inlineTitle: string;
  inlineBody: string;
  bulletsTitle: string;
  bullets: string[];
  closingTitle: string;
  closingBody: string;
  contactPrompt: string;
};

export const demoServiceDetails: Record<string, ServiceDetailDemo> = {
  "elderly-care": {
    tagline: "Trusted care that helps seniors thrive at home",
    paragraphs: [
      "Elderly care service brings together personal assistance, safety supervision, and family communication so your loved one can remain in familiar surroundings.",
      "Whether help is needed with daily routines or regular check-ins, plans are built around preferences, culture, and health goals — not a one-size-fits-all schedule.",
    ],
    inlineTitle: "Aging in place with confidence",
    inlineBody:
      "Our caregivers focus on consistency — the same faces where possible, clear updates for families, and care that adapts as needs change.",
    bulletsTitle: "Elderly care often includes:",
    bullets: [
      "Help with bathing, dressing, and grooming",
      "Meal preparation and nutrition support",
      "Medication reminders",
      "Companionship and social engagement",
      "Light housekeeping and laundry",
      "Escorts to appointments",
    ],
    closingTitle: "Care shaped around the person",
    closingBody:
      "Every senior has different routines, language, and family circumstances. We build plans together with you.",
    contactPrompt: "Talk with our care team about elderly care in Ottawa.",
  },
  "personal-care": {
    tagline: "Day-to-day care for your daily needs",
    paragraphs: [
      "Do you or a loved one need a little extra help at home? Chores, errands, and personal tasks can be difficult or unsafe to perform alone. When assistance with bathing, dressing, and grooming is needed, our personal care services are designed around those needs.",
      "With experienced and caring staff, your loved one can remain at home and live independently for longer. Care plans match needs exactly — compassionate support that gives families peace of mind.",
    ],
    inlineTitle: "Personal care that supports independence",
    inlineBody:
      "Many seniors prefer to age at home, but daily tasks can become harder over time. Personal care adds respectful assistance so familiar surroundings and routines can continue.",
    bulletsTitle: "Our caregivers assist with activities such as:",
    bullets: [
      "Personal grooming, bathing, toileting, and hygiene",
      "Mobility and safe transfers",
      "Medication reminders and monitoring",
      "Companionship and conversation",
      "Light housekeeping, meal planning, and meal preparation",
      "Shopping and errands",
    ],
    closingTitle: "Personal care for every need",
    closingBody:
      "Care is tailored whether someone is recovering from injury, living with a chronic condition, or simply needs extra support to stay safe at home.",
    contactPrompt: "Let our experienced caregivers help your family today.",
  },
  "companion-care": {
    tagline: "Meaningful connection and shared activities",
    paragraphs: [
      "Loneliness affects health as much as many physical conditions. Companion care provides conversation, shared activities, and gentle encouragement to stay engaged with community and family.",
      "Companions can accompany clients to appointments, help with hobbies, or simply share a meal — always within a plan agreed with the family.",
    ],
    inlineTitle: "Companionship that reduces isolation",
    inlineBody:
      "Regular visits from a familiar companion create structure in the day and give families reassurance that someone is checking in.",
    bulletsTitle: "Companion care may include:",
    bullets: [
      "Conversation and emotional support",
      "Shared walks and outings",
      "Games, reading, and hobbies",
      "Appointment escorts",
      "Light meal companionship",
      "Safety checks and family updates",
    ],
    closingTitle: "Flexible visits that fit your life",
    closingBody:
      "Schedules can be a few hours weekly or several visits per week depending on what keeps your loved one engaged and safe.",
    contactPrompt: "Ask about companion care availability in your area.",
  },
  "skilled-nursing": {
    tagline: "Skilled nursing support in the comfort of home",
    paragraphs: [
      "When clinical needs exceed what personal support workers can provide, registered nurses and registered practical nurses deliver skilled care with professional oversight.",
      "Nursing visits are coordinated with physicians and documented so families and referral partners share a single picture of care.",
    ],
    inlineTitle: "Clinical care without leaving home",
    inlineBody:
      "Hospital-at-home models work when nursing is reliable, communicated clearly, and matched to medical orders. We focus on those three pillars.",
    bulletsTitle: "Nursing services may include:",
    bullets: [
      "Wound care and dressing changes",
      "Medication administration where ordered",
      "Vital signs and health monitoring",
      "Post-hospital follow-up",
      "Care plan review with physicians",
      "Family and caregiver education",
    ],
    closingTitle: "Professional scope, personal delivery",
    closingBody:
      "All nursing care is provided within scope of practice and with orders from the appropriate healthcare provider.",
    contactPrompt: "Contact us to discuss skilled nursing care at home.",
  },
  "day-support": {
    tagline: "Dependable daytime and overnight presence",
    paragraphs: [
      "When someone should not be left alone — after a fall, during recovery, or when cognition makes solo time unsafe — day and overnight support keeps them comfortable at home.",
      "Caregivers follow a written plan covering meals, mobility, toileting, and safety checks, with a coordinator reachable for families.",
    ],
    inlineTitle: "Never alone when it matters most",
    inlineBody:
      "Live-in or extended shifts can bridge the gap between hospital discharge and long-term care, or give family caregivers predictable relief.",
    bulletsTitle: "24/7 day support may include:",
    bullets: [
      "Supervision and fall prevention",
      "Personal care and toileting assistance",
      "Meal preparation and hydration reminders",
      "Medication reminders",
      "Overnight presence and safety checks",
      "Updates to family each shift",
    ],
    closingTitle: "Flexible coverage",
    closingBody:
      "Tell us the hours and days you need — we staff to the plan rather than selling fixed packages.",
    contactPrompt: "Ask about day and overnight support in your area.",
  },
  "hospital-discharge": {
    tagline: "From hospital bed to home — without the gap",
    paragraphs: [
      "Hospital discharge is a vulnerable window. Transitions fail when instructions are unclear or help starts too late. We coordinate with discharge planners before your loved one leaves.",
      "Caregivers follow the written plan: mobility, personal care, meals, and medication reminders — escalating concerns the same day.",
    ],
    inlineTitle: "Discharge plans executed at home",
    inlineBody:
      "We confirm equipment, medications, and follow-up appointments are understood before the first home visit.",
    bulletsTitle: "Hospital discharge support includes:",
    bullets: [
      "Help with transfers and mobility",
      "Personal care during early recovery",
      "Medication reminders per discharge orders",
      "Meal preparation and hydration",
      "Communication with the healthcare team",
      "Nursing visits where clinically required",
    ],
    closingTitle: "Start planning before discharge day",
    closingBody:
      "Families who arrange support before leaving hospital report smoother recoveries and fewer readmissions.",
    contactPrompt: "Plan hospital discharge support with our care team.",
  },
  "respite-care": {
    tagline: "Temporary relief for family caregivers",
    paragraphs: [
      "Family caregivers need rest to sustain months or years of support. Respite care provides planned relief — a trusted professional in the home while you recharge.",
      "Visits can be a few hours, overnight, or on a recurring schedule so you can attend appointments, travel, or simply sleep through the night.",
    ],
    inlineTitle: "Peace of mind while you step away",
    inlineBody:
      "Respite is not abdication — it is how many families continue providing love long-term without burnout.",
    bulletsTitle: "Respite care can cover:",
    bullets: [
      "Personal care and companionship",
      "Meal preparation and safety supervision",
      "Medication reminders",
      "Overnight or weekend coverage",
      "Emergency backup when you are unwell",
      "Updates when you return",
    ],
    closingTitle: "Flexible scheduling",
    closingBody:
      "Book respite ahead of known events or keep a regular slot on the calendar — whichever fits your family.",
    contactPrompt: "Arrange respite care that fits your schedule.",
  },
  "chronic-condition-care": {
    tagline: "Steady support when health conditions persist",
    paragraphs: [
      "Diabetes, COPD, heart failure, arthritis and other chronic conditions need predictable routines — not crisis-only responses.",
      "Caregivers help with daily tasks, watch for changes, and keep families and clinicians informed when something shifts.",
    ],
    inlineTitle: "Living well with chronic illness",
    inlineBody:
      "Plans respect what the client can still do independently and add help only where it improves safety and comfort.",
    bulletsTitle: "Chronic condition care may include:",
    bullets: [
      "Medication and blood sugar reminders",
      "Meal planning aligned with dietary needs",
      "Mobility and exercise encouragement",
      "Personal care and hygiene",
      "Appointment escorts",
      "Documentation of symptoms for clinicians",
    ],
    closingTitle: "Long-term partnership",
    closingBody:
      "Chronic care is reviewed regularly so support grows or steps back as health changes.",
    contactPrompt: "Discuss chronic condition care for your loved one.",
  },
  "after-surgery-care": {
    tagline: "Recovery support after surgery at home",
    paragraphs: [
      "After surgery, rest and careful movement matter. Caregivers help with transfers, personal care, meals, and medication reminders while following surgeon instructions.",
      "We watch for signs of complication and escalate to your coordinator the same day — not after the weekend.",
    ],
    inlineTitle: "Surgical recovery without guesswork",
    inlineBody:
      "Therapy homework, incision care limits, and pain management schedules are written into the care plan caregivers follow.",
    bulletsTitle: "After surgery care often includes:",
    bullets: [
      "Mobility assistance per surgeon orders",
      "Personal care while movement is limited",
      "Meal preparation and hydration",
      "Medication reminders on schedule",
      "Light housekeeping in recovery areas",
      "Family updates after each visit",
    ],
    closingTitle: "Coordinate before the operation",
    closingBody:
      "Arranging care before surgery means help is ready the day your loved one comes home.",
    contactPrompt: "Plan after-surgery care with Jarkabi.",
  },
  "end-of-life-care": {
    tagline: "Comfort-focused support with dignity",
    paragraphs: [
      "Palliative and comfort-focused care prioritizes quality of life, symptom management, and companionship for clients and families facing serious illness.",
      "Care is gentle, predictable, and coordinated with physicians and hospice partners when involved.",
    ],
    inlineTitle: "Dignity at home",
    inlineBody:
      "Familiar surroundings, favourite music, and the people who matter most — palliative support keeps focus on what the client values.",
    bulletsTitle: "Comfort support may include:",
    bullets: [
      "Personal care with sensitivity",
      "Companionship and presence",
      "Family respite and coordination",
      "Medication reminders as ordered",
      "Light housekeeping and meal support",
      "Emotional support for families",
    ],
    closingTitle: "A team that listens",
    closingBody:
      "Plans evolve with the client's wishes and medical guidance. We communicate clearly so no one feels alone in decisions.",
    contactPrompt: "Speak with us about end-of-life care at home.",
  },
  "special-needs-care": {
    tagline: "Focused support for complex daily living needs",
    paragraphs: [
      "Special needs care covers dementia, cognitive change, mobility limitations, and combinations of conditions that require trained, patient caregivers.",
      "We prioritize routine, familiar faces, and activities matched to what the person still enjoys.",
    ],
    inlineTitle: "Support that respects the whole person",
    inlineBody:
      "Plans focus on safety, dignity, and reducing stress for both the client and family caregivers.",
    bulletsTitle: "Special needs care may include:",
    bullets: [
      "Routine-building and gentle cueing",
      "Supervision for wandering or confusion",
      "Meaningful activities and reminiscence",
      "Personal care with sensitivity",
      "Family communication and education",
      "Coordination with physicians and therapists",
    ],
    closingTitle: "Partnership with families",
    closingBody:
      "Families remain central to care decisions. We document changes and escalate concerns promptly.",
    contactPrompt: "Learn how special needs care can work in your home.",
  },
};

export function getDemoServiceDetail(slug: string): ServiceDetailDemo | null {
  return demoServiceDetails[slug] ?? null;
}
