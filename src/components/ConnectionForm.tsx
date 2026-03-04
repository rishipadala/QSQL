'use client';

import { useState } from 'react';
import { saveCredentials, testConnection, type SupabaseCredentials } from '@/lib/supabase';
import { Loader2, CheckCircle2, XCircle, Link2 } from 'lucide-react';

interface ConnectionFormProps {
  onConnected: () => void;
  initialCreds?: SupabaseCredentials | null;
}

export function ConnectionForm({ onConnected, initialCreds }: ConnectionFormProps) {
  const [url, setUrl] = useState(initialCreds?.url || '');
  const [anonKey, setAnonKey] = useState(initialCreds?.anonKey || '');
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUrl = url.trim().replace(/\/$/, '');
    const trimmedKey = anonKey.trim();

    if (!trimmedUrl || !trimmedKey) return;

    setTesting(true);
    setStatus('idle');
    setErrorMsg('');

    const result = await testConnection({ url: trimmedUrl, anonKey: trimmedKey });

    if (result.success) {
      setStatus('success');
      saveCredentials({ url: trimmedUrl, anonKey: trimmedKey });
      setTimeout(() => onConnected(), 500);
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Connection failed');
    }

    setTesting(false);
  };

  return (
    <form onSubmit={handleConnect} className="space-y-4">
      <div>
        <label htmlFor="supabase-url" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Supabase Project URL
        </label>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <input
            id="supabase-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-project.supabase.co"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/40 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="anon-key" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Anon / Public Key
        </label>
        <input
          id="anon-key"
          type="password"
          value={anonKey}
          onChange={(e) => setAnonKey(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary/40 transition-all font-mono"
          required
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/8 border border-destructive/15">
          <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
          <p className="text-sm text-destructive">{errorMsg}</p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-success/8 border border-success/15">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <p className="text-sm text-success font-medium">Connected successfully!</p>
        </div>
      )}

      <button
        type="submit"
        disabled={testing || !url.trim() || !anonKey.trim()}
        className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        {testing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Testing Connection...
          </>
        ) : (
          'Connect to Supabase'
        )}
      </button>
    </form>
  );
}
