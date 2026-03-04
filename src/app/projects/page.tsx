'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCredentials,
  getProjects,
  createProject,
  renameProject,
  deleteProject,
  clearCredentials,
  type Project,
  type SupabaseCredentials,
} from '@/lib/supabase';
import { ConnectionForm } from '@/components/ConnectionForm';
import {
  Plus,
  FolderOpen,
  Pencil,
  Trash2,
  LogOut,
  Database,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const router = useRouter();
  const [creds, setCreds] = useState<SupabaseCredentials | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCreds(getCredentials());
    setProjects(getProjects());
  }, []);

  const handleConnected = () => {
    setCreds(getCredentials());
    toast.success('Connected to Supabase!');
  };

  const handleDisconnect = () => {
    clearCredentials();
    setCreds(null);
    toast.success('Disconnected from Supabase');
  };

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const project = createProject(trimmed);
    setProjects(getProjects());
    setNewName('');
    setShowNewForm(false);
    toast.success(`Project "${project.name}" created`);
  };

  const handleRename = (id: string) => {
    const trimmed = editName.trim();
    if (!trimmed) return;
    renameProject(id, trimmed);
    setProjects(getProjects());
    setEditingId(null);
    setEditName('');
    toast.success('Project renamed');
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete project "${name}"? This will also clear its query history.`)) return;
    deleteProject(id);
    setProjects(getProjects());
    toast.success(`Project "${name}" deleted`);
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!creds) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-20 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-3">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Connect Your Database
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your Supabase credentials to get started.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-border/50 bg-card">
          <ConnectionForm onConnected={handleConnected} />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Need help?{' '}
          <a href="/guide" className="text-primary hover:underline font-medium">
            Read the setup guide
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Your Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Connected to{' '}
            <span className="font-mono text-xs bg-muted/60 px-1.5 py-0.5 rounded">
              {creds.url.replace('https://', '').split('.')[0]}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewForm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm active:scale-[0.97]"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
          <button
            onClick={handleDisconnect}
            className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
            title="Disconnect"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New project form */}
      {showNewForm && (
        <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Project name..."
              className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              autoFocus
            />
            <button
              type="submit"
              disabled={!newName.trim()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => {
                setShowNewForm(false);
                setNewName('');
              }}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Projects list */}
      {projects.length === 0 ? (
        <div className="text-center py-14">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
            <FolderOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="text-base font-semibold text-foreground mb-1">No projects yet</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first project to start writing SQL.
          </p>
          <button
            onClick={() => setShowNewForm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      ) : (
        <div className="grid gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/50 bg-card hover:border-primary/20 transition-colors group"
            >
              {editingId === project.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRename(project.id);
                  }}
                  className="flex items-center gap-2 flex-1"
                >
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <>
                  <button
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Database className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingId(project.id);
                        setEditName(project.name);
                      }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                      title="Rename"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.name)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
