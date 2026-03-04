'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCredentials, getProjects, type Project } from '@/lib/supabase';
import { SQLEditor } from '@/components/SQLEditor';
import { ArrowLeft, Database } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hasConnection, setHasConnection] = useState(false);

  useEffect(() => {
    setMounted(true);
    const creds = getCredentials();
    if (!creds) {
      router.push('/projects');
      return;
    }
    setHasConnection(true);

    const projects = getProjects();
    const found = projects.find((p) => p.id === projectId);
    if (!found) {
      router.push('/projects');
      return;
    }
    setProject(found);
  }, [projectId, router]);

  if (!mounted || !hasConnection || !project) {
    return (
      <div className="h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact toolbar */}
      <div className="flex items-center justify-between px-3 h-10 border-b border-border/40 bg-card/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5">
          <Link
            href="/projects"
            className="p-1.5 rounded-md hover:bg-muted/60 transition-colors"
            title="Back to projects"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div className="w-px h-4 bg-border/40" />
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-semibold text-foreground tracking-tight">{project.name}</span>
          </div>
          <span className="text-[11px] text-muted-foreground/60 hidden sm:inline font-medium">SQL Playground</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Full-screen SQL Editor */}
      <div className="flex-1 min-h-0">
        <SQLEditor projectId={projectId} />
      </div>
    </div>
  );
}
