import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Legacy route — redirects to /why-jarkabi */
export default async function WhyChooseUsRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/why-jarkabi`);
}
