-- Jarkabi Home Care — portal schema (Canada Central Supabase)
-- Apply with Supabase CLI: supabase db push

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles extend Supabase Auth users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  client_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  primary_profile_id UUID REFERENCES public.profiles(id),
  province_code TEXT,
  city_slug TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_client_id_fkey
  FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS public.client_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'caregiver',
  active BOOLEAN NOT NULL DEFAULT true,
  starts_on DATE,
  ends_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (client_id, profile_id, role)
);

CREATE TABLE IF NOT EXISTS public.care_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.care_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  care_plan_id UUID NOT NULL REFERENCES public.care_plans(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  caregiver_profile_id UUID REFERENCES public.profiles(id),
  service_name TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT
);

CREATE TABLE IF NOT EXISTS public.visit_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL REFERENCES public.visits(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.timesheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id),
  work_date DATE NOT NULL,
  hours NUMERIC(5,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.message_threads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id),
  category TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  amount_cents INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  due_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Public form mirrors (service-role insert; staff read via RLS)
CREATE TABLE IF NOT EXISTS public.care_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'en',
  payload JSONB NOT NULL,
  source_ip TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'en',
  payload JSONB NOT NULL,
  source_ip TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'en',
  payload JSONB NOT NULL,
  source_ip TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL DEFAULT 'en',
  payload JSONB NOT NULL,
  source_ip TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assignments_profile ON public.client_assignments(profile_id);
CREATE INDEX IF NOT EXISTS idx_visits_client ON public.visits(client_id);
CREATE INDEX IF NOT EXISTS idx_care_plans_client ON public.care_plans(client_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);
