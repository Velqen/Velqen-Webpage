// src/app/ai-tools/layout.tsx
export default function AiToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-dvh w-full mt-32">{children}</main>; // Just renders children, no layout elements
}
