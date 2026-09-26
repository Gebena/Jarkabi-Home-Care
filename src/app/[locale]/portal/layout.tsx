import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PortalRootLayout({ children }: Props) {
  return children;
}
