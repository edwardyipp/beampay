import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System | BeamPay",
  description: "Visual language, components, and patterns that define the BeamPay experience.",
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
