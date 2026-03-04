import Link from 'next/link';
import { Database, Zap, Shield, Code2, ArrowRight, Github } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
          <Zap className="w-3 h-3" />
          Open Source SQL Playground
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
          Write SQL.{' '}
          <span className="text-primary">See Results.</span>
          <br />
          In Real Time.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          A minimalistic SQL editor powered by your own Supabase database.
          Full RDBMS support — keys, joins, aggregations, and more.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.97]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-secondary/60 transition-colors"
          >
            Read the Docs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-t border-border/50 animate-fade-in animate-delay-100">
        <h2 className="text-lg font-bold text-center text-foreground mb-8">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              icon: Database,
              title: 'Full RDBMS Support',
              desc: 'CREATE, INSERT, UPDATE, DELETE, JOINs, keys, indexes, constraints, aggregations, subqueries, and more.',
            },
            {
              icon: Zap,
              title: 'Real-time Results',
              desc: 'Execute SQL instantly against your Supabase PostgreSQL database with clean tabular output.',
            },
            {
              icon: Shield,
              title: 'Your Data, Your Control',
              desc: 'Connect your own Supabase. Credentials stored locally — nothing sent to third parties.',
            },
            {
              icon: Code2,
              title: 'Monaco Editor',
              desc: 'VS Code-quality editing with syntax highlighting, autocomplete, and keyboard shortcuts.',
            },
            {
              icon: Github,
              title: 'Open Source',
              desc: 'MIT licensed. Fork it, extend it, contribute to it. Built for the community.',
            },
            {
              icon: Database,
              title: 'Project Isolation',
              desc: 'Each project has its own query history. One project never affects another.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/20 transition-colors card-hover"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border/50 text-center animate-fade-in animate-delay-200">
        <h2 className="text-lg font-bold text-foreground mb-2">
          Ready to start querying?
        </h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          Connect your Supabase database, create a project, and start writing SQL in minutes.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.97]"
        >
          Launch Editor
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>
          QSQL is open source under the MIT License.{' '}
          <Link href="/open-source" className="text-primary hover:underline">
            Learn more
          </Link>
        </p>
      </footer>
    </div>
  );
}
