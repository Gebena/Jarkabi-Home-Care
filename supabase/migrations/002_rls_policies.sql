-- Row Level Security policies — assignment-based access per MASTER_PROMPT §56

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.current_profile_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_staff_role()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role IN (
      'super_admin', 'administrator', 'operations_manager', 'clinical_director',
      'care_coordinator', 'scheduler', 'billing', 'hr', 'rn', 'rpn', 'caregiver'
    ) FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

CREATE OR REPLACE FUNCTION public.is_assigned_to_client(target_client UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.client_assignments
    WHERE profile_id = auth.uid()
      AND client_id = target_client
      AND active = true
  );
$$;

-- Profiles: users read/update self; staff read assigned clients' profiles via joins
CREATE POLICY profiles_select_self ON public.profiles
  FOR SELECT USING (id = auth.uid() OR public.is_staff_role());

CREATE POLICY profiles_update_self ON public.profiles
  FOR UPDATE USING (id = auth.uid());

-- Clients: client/family read own; assigned staff read assigned; ops read all
CREATE POLICY clients_select ON public.clients
  FOR SELECT USING (
    primary_profile_id = auth.uid()
    OR public.is_assigned_to_client(id)
    OR public.current_profile_role() IN (
      'super_admin', 'administrator', 'operations_manager', 'care_coordinator',
      'clinical_director', 'scheduler', 'billing', 'hr'
    )
  );

-- Assignments
CREATE POLICY assignments_select ON public.client_assignments
  FOR SELECT USING (
    profile_id = auth.uid()
    OR public.is_assigned_to_client(client_id)
    OR public.current_profile_role() IN (
      'super_admin', 'administrator', 'operations_manager', 'scheduler', 'care_coordinator'
    )
  );

-- Care plans
CREATE POLICY care_plans_select ON public.care_plans
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.clients c
      WHERE c.id = care_plans.client_id
        AND (c.primary_profile_id = auth.uid() OR public.is_assigned_to_client(c.id))
    )
    OR public.current_profile_role() IN (
      'super_admin', 'administrator', 'clinical_director', 'care_coordinator', 'rn', 'rpn'
    )
  );

CREATE POLICY care_plan_items_select ON public.care_plan_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.care_plans cp
      JOIN public.clients c ON c.id = cp.client_id
      WHERE cp.id = care_plan_items.care_plan_id
        AND (c.primary_profile_id = auth.uid() OR public.is_assigned_to_client(c.id))
    )
    OR public.current_profile_role() IN (
      'super_admin', 'administrator', 'clinical_director', 'care_coordinator', 'rn', 'rpn'
    )
  );

-- Visits
CREATE POLICY visits_select ON public.visits
  FOR SELECT USING (
    public.is_assigned_to_client(client_id)
    OR EXISTS (
      SELECT 1 FROM public.clients c WHERE c.id = visits.client_id AND c.primary_profile_id = auth.uid()
    )
    OR public.current_profile_role() IN (
      'super_admin', 'administrator', 'operations_manager', 'care_coordinator',
      'clinical_director', 'scheduler', 'rn', 'rpn'
    )
  );

-- Timesheets: own or ops
CREATE POLICY timesheets_select ON public.timesheets
  FOR SELECT USING (
    profile_id = auth.uid()
    OR public.current_profile_role() IN (
      'super_admin', 'administrator', 'operations_manager', 'billing', 'scheduler'
    )
  );

CREATE POLICY timesheets_insert_own ON public.timesheets
  FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY timesheets_update_own ON public.timesheets
  FOR UPDATE USING (profile_id = auth.uid());

-- Form mirrors: no public read; staff read
CREATE POLICY care_requests_staff_read ON public.care_requests
  FOR SELECT USING (
    public.current_profile_role() IN (
      'super_admin', 'administrator', 'care_coordinator', 'operations_manager'
    )
  );

CREATE POLICY contact_messages_staff_read ON public.contact_messages
  FOR SELECT USING (
    public.current_profile_role() IN (
      'super_admin', 'administrator', 'care_coordinator', 'operations_manager'
    )
  );

CREATE POLICY referrals_staff_read ON public.referrals
  FOR SELECT USING (
    public.current_profile_role() IN (
      'super_admin', 'administrator', 'care_coordinator', 'operations_manager'
    )
  );

CREATE POLICY job_applications_hr_read ON public.job_applications
  FOR SELECT USING (
    public.current_profile_role() IN ('super_admin', 'administrator', 'hr')
  );

-- Audit logs: admin read only; inserts via service role
CREATE POLICY audit_logs_admin_read ON public.audit_logs
  FOR SELECT USING (
    public.current_profile_role() IN ('super_admin', 'administrator')
  );

-- Anonymous inserts handled by service role (bypasses RLS)
