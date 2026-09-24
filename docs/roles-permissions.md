# Roles & Permissions — Jarkabi Home Care

**Current implementation:** Payload CMS `users` collection with `role` select field.  
**Future:** Granular RBAC + Supabase RLS for portal users §73.

---

## Defined roles (Payload Users)

| Role | Slug | Intended access |
|------|------|-----------------|
| Super Admin | `super_admin` | Full system access |
| National Admin | `national_admin` | All provinces, users, settings |
| Provincial Admin | `provincial_admin` | Assigned province(s) only |
| Regional Admin | `regional_admin` | Assigned region/cities |
| Content Editor | `content_editor` | Pages, blog, services, team, FAQs |
| Translator | `translator` | Localized content fields only |
| Recruitment / HR | `hr` | Careers, job applications |
| Care Coordinator | `care_coordinator` | Care requests, referrals |
| SEO Editor | `seo_editor` | SEO metadata, slugs *(planned)* |

---

## Permission matrix (target state)

| Module | super | national | provincial | regional | editor | translator | hr | coordinator | seo |
|--------|:-----:|:--------:|:----------:|:--------:|:------:|:----------:|:--:|:-----------:|:---:|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Brand Settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Users & Roles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Pages | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | ❌ | 👁 |
| Services | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | 👁 | 👁 |
| Locations | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | 👁 | 👁 |
| Team | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | ❌ | ❌ |
| Testimonials | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | ❌ | ❌ |
| FAQs | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | ❌ | 👁 |
| Blog / Resources | ✅ | ✅ | ✅ | ✅ | ✅ | 📝 | ❌ | ❌ | 👁 |
| Careers | ✅ | ✅ | ✅ | ✅ | 👁 | ❌ | ✅ | ❌ | ❌ |
| Job Applications | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Care Requests | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Referrals | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Media | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| SEO | ✅ | ✅ | ✅ | ✅ | 👁 | ❌ | ❌ | ❌ | ✅ |

Legend: ✅ full | 📝 translate only | 👁 read only | ❌ no access

---

## Current gaps

| Gap | Priority | Phase |
|-----|----------|-------|
| Collection-level access hooks not enforced per role | High | 10 |
| Provincial scoping (filter by assigned province) | Medium | 10 |
| Audit logging on sensitive reads | Medium | 10+ |
| Separate public Supabase Auth users | Low | Portal phase |

---

## Security rules

1. Never expose `care-requests`, `referrals`, or `job-applications` via public API read
2. Resume files in `media` — access restricted to `hr`+ roles
3. Default seed admin password must be changed before production
4. Service role keys never in client code §72

---

*Implementation file: `src/payload/collections/Users.ts`*
