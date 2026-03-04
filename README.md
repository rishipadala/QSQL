# QSQL

A real-time, open-source SQL editor and playground powered by your own Supabase PostgreSQL database. Full RDBMS functionality with a minimalistic, milky Material UI and Light/Dark mode.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- **Full RDBMS Support** — CREATE, INSERT, UPDATE, DELETE, JOINs (INNER, LEFT, RIGHT, FULL OUTER, CROSS, Self), primary/foreign/composite keys, indexes, constraints, aggregations, subqueries, CTEs, window functions, views, and more
- **Real-time SQL Execution** — Execute SQL instantly against your Supabase PostgreSQL database
- **Monaco Editor** — VS Code-quality editing with syntax highlighting, autocomplete, and Ctrl+Enter to run
- **Project Management** — Create, rename, and delete isolated projects, each with their own query history
- **Light/Dark Mode** — Beautiful milky Material UI with theme toggle
- **Export Results** — Copy as JSON or export as CSV
- **Query History** — Per-project query history with one-click reuse
- **SQL Quick Reference** — Built-in templates for common operations
- **Your Data, Your Control** — Credentials stored in localStorage, never sent to third-party servers
- **Open Source** — MIT licensed, fork and extend it

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/theyashva/QSQL.git
cd QSQL
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** in Supabase and run this function:

```sql
CREATE OR REPLACE FUNCTION exec_sql(query_text TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  EXECUTE 'SELECT COALESCE(json_agg(row_to_json(t)), ''[]''::json) FROM (' || query_text || ') t'
  INTO result;
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  BEGIN
    EXECUTE query_text;
    RETURN json_build_object('status', 'success', 'message', 'Query executed successfully');
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION '%', SQLERRM;
  END;
END;
$$;
```

4. Go to **Project Settings > API** and copy your **Project URL** and **anon/public key**
5. Enter them in QSQL's connection form

See the full [Setup Guide](http://localhost:3000/guide) in the app for detailed instructions.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) | React framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Supabase](https://supabase.com) | PostgreSQL database |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Code editor |
| [Lucide Icons](https://lucide.dev) | Icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management |
| [Sonner](https://sonner.emilkowal.dev) | Toast notifications |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Landing page
│   ├── docs/page.tsx       # Documentation
│   ├── guide/page.tsx      # Supabase setup guide
│   ├── open-source/page.tsx # Open source info & contributing
│   ├── projects/page.tsx   # Project management & connection
│   └── editor/[id]/page.tsx # SQL editor/playground
├── components/
│   ├── ConnectionForm.tsx  # Supabase credentials form
│   ├── Navbar.tsx          # Navigation bar
│   ├── SQLEditor.tsx       # Monaco-based SQL editor with results
│   ├── ThemeProvider.tsx   # Dark/Light theme context
│   └── ThemeToggle.tsx     # Theme toggle button
└── lib/
    └── supabase.ts         # Supabase client, storage, SQL execution
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.
