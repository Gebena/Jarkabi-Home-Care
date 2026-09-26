/** Demo portal data when Supabase Auth is not configured (`NEXT_PUBLIC_PORTAL_DEMO=true`). */

export type DemoVisit = {
  id: string;
  date: string;
  time: string;
  caregiver: string;
  service: string;
  status: "scheduled" | "completed" | "cancelled";
};

export type DemoCarePlanItem = {
  id: string;
  goal: string;
  tasks: string[];
  updatedAt: string;
};

export const demoVisits: DemoVisit[] = [
  {
    id: "v1",
    date: "2026-09-28",
    time: "09:00 – 12:00",
    caregiver: "Assigned caregiver",
    service: "Personal support",
    status: "scheduled",
  },
  {
    id: "v2",
    date: "2026-09-30",
    time: "14:00 – 16:00",
    caregiver: "Assigned caregiver",
    service: "Companionship",
    status: "scheduled",
  },
];

export const demoCarePlan: DemoCarePlanItem[] = [
  {
    id: "cp1",
    goal: "Safe mobility at home",
    tasks: ["Stand-by assist with transfers", "Clear pathways before visits"],
    updatedAt: "2026-09-20",
  },
  {
    id: "cp2",
    goal: "Medication reminders",
    tasks: ["Morning medication cueing", "Log adherence in visit notes"],
    updatedAt: "2026-09-18",
  },
];

export const demoTimesheets = [
  { id: "t1", date: "2026-09-24", hours: 3, client: "Client A", status: "submitted" },
  { id: "t2", date: "2026-09-25", hours: 4, client: "Client B", status: "draft" },
];

export const demoMessages = [
  {
    id: "m1",
    from: "Care coordinator",
    subject: "Upcoming visit confirmation",
    preview: "Your visit on September 28 is confirmed.",
    at: "2026-09-26",
  },
];

export const demoAuditLogs = [
  {
    id: "a1",
    action: "VIEW_CLIENT",
    actor: "Care coordinator",
    at: "2026-09-26T14:00:00Z",
  },
  {
    id: "a2",
    action: "UPDATE_CARE_PLAN",
    actor: "RN",
    at: "2026-09-25T10:30:00Z",
  },
];
