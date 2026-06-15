// app/portfolio/[id]/page.tsx
// Thin server component — handles SEO, static params, then delegates to client component

import { projects } from '@/data/project';
import ProjectDetailPage from '@/app/portfolio/ProjectDetailPage';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const p = projects.find((x) => x.id === params.id);
  if (!p) return {};
  return {
    title: `${p.title} — Case Study | Edroyt`,
    description: p.tagline,
  };
}

export default function Page() {
  return <ProjectDetailPage />;
}