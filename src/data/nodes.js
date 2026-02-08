// Node definitions with sub-components and tooltips

export const systemNodes = [
  {
    id: 'openclaw',
    label: 'OpenClaw Gateway',
    subtitle: 'VPS • Claude Opus 4.6',
    status: 'online',
    tooltip: 'The central AI assistant running on a VPS. Handles all user interactions via Telegram, orchestrates tasks across the entire system, and maintains persistent memory. This is the brain of the operation.',
    icon: '🧠',
    position: { x: 350, y: 50 },
    children: [
      { id: 'oc-model', label: 'Claude Opus 4.6', status: 'online', tooltip: 'The primary LLM powering all reasoning and responses. Opus is Anthropic\'s most capable model — chosen for complex multi-step tasks, code generation, and nuanced conversation.' },
      { id: 'oc-telegram', label: 'Telegram Channel', status: 'online', tooltip: 'The primary user interface. All conversations with Dara happen here. Supports text, voice messages (transcribed via Whisper), images, and inline buttons.' },
      { id: 'oc-skills', label: 'Skills System (20+)', status: 'online', tooltip: 'Modular capability system — each skill is a focused tool: batch operations, kanban management, memory read/write, obsidian vault editing, research, weather, GitHub, and more. Skills are loaded contextually.' },
      { id: 'oc-cron', label: 'Cron Scheduler', status: 'online', tooltip: 'Automated scheduled tasks: daily log compilation, RSVP deadline checks, security audits, news digests. Runs via heartbeat system — the agent checks for pending tasks each cycle.' },
      { id: 'oc-memory', label: 'Memory Files', status: 'online', tooltip: 'Persistent memory layer: MEMORY.md (curated long-term knowledge), memory/*.md (daily notes), AGENTS.md (behavioral rules), SOUL.md (personality/values), USER.md (user preferences). Loaded every session.' },
      { id: 'oc-sessions', label: 'Session Management', status: 'online', tooltip: 'Supports main session + isolated sub-agent sessions. Sub-agents handle focused tasks (research, builds, reviews) without polluting the main conversation context.' },
      { id: 'oc-tools', label: 'Tools', status: 'online', tooltip: 'Built-in tooling: web search (Brave API), web fetch (URL→markdown), browser automation (Playwright), node control (run commands on paired devices). Extends the agent beyond text.' },
    ]
  },
  {
    id: 'langgraph',
    label: 'LangGraph Orchestrator',
    subtitle: 'VPS :8100 • Tailscale only',
    status: 'online',
    tooltip: 'A multi-agent orchestration layer running on the VPS. Routes complex tasks to specialist agents with appropriate model tiers. Only accessible via Tailscale (not exposed to public internet).',
    icon: '🔀',
    position: { x: 80, y: 250 },
    children: [
      { id: 'lg-agents', label: '5 Specialist Agents', status: 'online', tooltip: 'Dev (code generation/review), Research (web research/analysis), Docs (documentation/writing), Security (audits/hardening), QA (testing/verification). Each has tailored system prompts and tool access.' },
      { id: 'lg-routing', label: 'Model Routing', status: 'online', tooltip: 'Gemini Flash classifier analyzes each task and routes to the appropriate model tier: Flash (simple/fast), Sonnet (balanced), Opus (complex). Optimizes cost and speed without sacrificing quality.' },
      { id: 'lg-systemd', label: 'Systemd Service', status: 'online', tooltip: 'Runs as a hardened systemd service with automatic restart, resource limits, and security sandboxing. Ensures the orchestrator stays up without manual intervention.' },
    ]
  },
  {
    id: 'kanban',
    label: 'Kanban Board',
    subtitle: 'Vercel + Supabase',
    status: 'online',
    tooltip: 'A custom-built task management board deployed on Vercel. Both Dara and the AI agents use it to track work. Provides visibility into what\'s planned, in progress, and done.',
    icon: '📋',
    position: { x: 620, y: 250 },
    children: [
      { id: 'kb-nextjs', label: 'Next.js App', status: 'online', tooltip: 'Full-stack Next.js application hosted at kanban.darafitzgerald.co.uk. Server-side rendering, API routes for agent access, and a responsive drag-and-drop UI.' },
      { id: 'kb-supabase', label: 'Supabase Realtime', status: 'online', tooltip: 'PostgreSQL database with real-time subscriptions. When the agent updates a task via API, the browser UI updates instantly — no refresh needed.' },
      { id: 'kb-api', label: 'Agent API', status: 'online', tooltip: 'REST API authenticated via X-Agent-API-Key header. Agents can create tasks, add comments, claim work, create subtasks, and move tasks through columns programmatically.' },
      { id: 'kb-columns', label: 'Workflow Columns', status: 'online', tooltip: 'Backlog → To Do → In Progress → QA → Done. Strict workflow: agents move tasks through columns properly, never skip steps. QA column ensures review before completion.' },
    ]
  },
  {
    id: 'vault',
    label: 'Obsidian Vault',
    subtitle: 'Git-synced knowledge base',
    status: 'online',
    tooltip: 'A rich knowledge base in Obsidian (markdown files with metadata). Synced between Mac, GitHub, and VPS via git. Contains curated collections of books, recipes, tech notes, and more.',
    icon: '📚',
    position: { x: 120, y: 430 },
    children: [
      { id: 'v-gitsync', label: 'Git Sync', status: 'online', tooltip: 'Three-way sync: Mac (Obsidian app) ↔ GitHub (central repo) ↔ VPS (agent access). Changes from any location propagate to all others. Conflict resolution via git merge.' },
      { id: 'v-clipper', label: 'Web Clipper (11 templates)', status: 'online', tooltip: 'Browser extension that saves web content into the vault with structured metadata. 11 templates: Books, YouTube, IMDB, Recipes, GitHub repos, Articles, and more. Each template extracts relevant fields automatically.' },
      { id: 'v-bases', label: 'Base Views', status: 'online', tooltip: 'Database-like views over vault content: Books, Videos, Movies, Recipes, Tech, Places, Products. Each base aggregates notes by type with sortable/filterable columns. Like Notion databases but in plain markdown.' },
      { id: 'v-agent', label: 'Agent Skills', status: 'online', tooltip: 'The AI agent can read/write vault markdown, query bases, and create canvas diagrams. Claude Code integration via Obsidian\'s Terminal plugin allows direct CLI access from within the app.' },
    ]
  },
  {
    id: 'vps',
    label: 'VPS Services',
    subtitle: 'Infrastructure layer',
    status: 'online',
    tooltip: 'The underlying VPS infrastructure that hosts OpenClaw and supporting services. Secured behind Tailscale mesh network with UFW firewall rules.',
    icon: '🖥️',
    position: { x: 350, y: 430 },
    children: [
      { id: 'vps-tailscale', label: 'Tailscale (100.69.233.8)', status: 'online', tooltip: 'WireGuard-based mesh VPN connecting VPS, Mac, and any other devices. All inter-device communication travels over encrypted Tailscale tunnels. IP: 100.69.233.8.' },
      { id: 'vps-ufw', label: 'UFW Firewall', status: 'online', tooltip: 'Uncomplicated Firewall with default-deny policy. Only Tailscale traffic is allowed in. Public ports are blocked. Defense in depth alongside Tailscale\'s own encryption.' },
      { id: 'vps-ollama', label: 'Ollama + mxbai-embed-large', status: 'online', tooltip: 'Local embedding model server. Runs mxbai-embed-large for generating vector embeddings used by Memindex. Keeps embedding generation fast and free (no API costs).' },
      { id: 'vps-claude', label: 'Claude Code CLI', status: 'online', tooltip: 'Authenticated Claude Code CLI installation. Used by LangGraph agents and for direct CLI-based development tasks on the VPS.' },
      { id: 'vps-systemd', label: 'Systemd Services', status: 'online', tooltip: 'Two managed services: openclaw (the gateway daemon) and langgraph-orchestrator. Both auto-restart on failure and start on boot.' },
    ]
  },
  {
    id: 'mac',
    label: 'Mac Node',
    subtitle: '100.79.90.13',
    status: 'online',
    tooltip: 'Dara\'s Mac computer, paired as a remote node. The agent can execute commands on it via node control — accessing Google Workspace tools, local CLIs, and the Obsidian app.',
    icon: '💻',
    position: { x: 580, y: 430 },
    children: [
      { id: 'mac-gog', label: 'gog CLI', status: 'online', tooltip: 'Google Workspace CLI: Drive (list/upload/download), Gmail (search/read/send), Calendar (events/create), Docs, Sheets. The agent\'s gateway to Google services via the Mac.' },
      { id: 'mac-gdocs', label: 'gdocs-edit.mjs', status: 'online', tooltip: 'Custom script for Google Docs editing: read, create, append, insert, delete, replace operations. More precise than the gog CLI for document manipulation.' },
      { id: 'mac-gemini', label: 'gemini CLI', status: 'online', tooltip: 'Google Gemini CLI used as image generation fallback. When the primary image gen on VPS isn\'t suitable, the agent can generate images via Gemini on the Mac.' },
      { id: 'mac-claude', label: 'claude CLI', status: 'online', tooltip: 'Local Claude Code CLI on the Mac. Used for development tasks that need Mac-local file access or tools.' },
      { id: 'mac-summarize', label: 'summarize CLI', status: 'online', tooltip: 'Text summarization utility. Used for condensing long documents or web content into concise summaries.' },
      { id: 'mac-syncthing', label: 'Syncthing', status: 'online', tooltip: 'Continuous file sync for the Measurelab Toolkit. Keeps shared resources synchronized without cloud intermediaries.' },
      { id: 'mac-obsidian', label: 'Obsidian App', status: 'online', tooltip: 'The Obsidian desktop app with the synced vault. Dara\'s primary interface for browsing and editing the knowledge base. Changes sync to GitHub and VPS via git.' },
    ]
  },
  {
    id: 'memindex',
    label: 'Memory / Memindex',
    subtitle: 'Semantic search layer',
    status: 'online',
    tooltip: 'A semantic search system that indexes all of Dara\'s knowledge sources (vault, kanban, memory files, session logs) into a vector database. Enables the agent to find relevant context by meaning, not just keywords.',
    icon: '🔍',
    position: { x: 350, y: 600 },
    children: [
      { id: 'mi-memquery', label: 'memquery CLI', status: 'online', tooltip: 'Command-line tool for searching the index: search (semantic + keyword), sync (update index), stats (index health), reindex (full rebuild). The agent\'s primary search interface.' },
      { id: 'mi-lancedb', label: 'LanceDB + Ollama', status: 'online', tooltip: 'LanceDB is a lightweight vector database storing embeddings generated by Ollama\'s mxbai-embed-large model. Fast local similarity search without external API dependencies.' },
      { id: 'mi-search', label: 'Hybrid Search', status: 'online', tooltip: 'Combines vector similarity (semantic meaning) with keyword matching (exact terms). Hybrid approach catches both conceptually related and literally matching content.' },
      { id: 'mi-sources', label: 'Sources (1883 chunks)', status: 'online', tooltip: 'Indexed content: vault (1776 chunks from Obsidian notes), kanban (50 tasks), memory (20 daily notes), sessions (24 conversation logs). Covers all knowledge sources.' },
      { id: 'mi-index', label: 'Index Storage', status: 'online', tooltip: 'Stored at ~/.openclaw/memindex/lancedb/. Lightweight on-disk format. Can be fully rebuilt from source files via memquery reindex.' },
    ]
  },
];

export const systemEdges = [
  { id: 'e-oc-telegram', source: 'openclaw', target: 'telegram-ext', label: 'Messages', tooltip: 'Bidirectional message flow. User sends messages via Telegram, agent responds. Supports text, voice (transcribed), images, and inline buttons.', animated: true },
  { id: 'e-oc-lg', source: 'openclaw', target: 'langgraph', label: 'Task delegation', tooltip: 'OpenClaw delegates complex multi-step tasks to the LangGraph orchestrator, which routes them to specialist agents with appropriate model tiers.' },
  { id: 'e-oc-kb', source: 'openclaw', target: 'kanban', label: 'API calls', tooltip: 'OpenClaw reads and writes kanban tasks via REST API. Creates tasks, adds comments, moves items through workflow columns, and tracks progress.' },
  { id: 'e-oc-mac', source: 'openclaw', target: 'mac', label: 'Node control', tooltip: 'OpenClaw executes commands on the Mac via node control protocol over Tailscale. Accesses Google tools, local CLIs, and file system.' },
  { id: 'e-oc-mi', source: 'openclaw', target: 'memindex', label: 'Search', tooltip: 'OpenClaw queries Memindex to find relevant context from across all knowledge sources. Semantic search helps the agent recall information it doesn\'t have in active memory.' },
  { id: 'e-vault-github', source: 'vault', target: 'github-ext', label: 'Git sync', tooltip: 'Obsidian vault syncs to GitHub via git push/pull. Central repository ensures all copies stay synchronized.', animated: true },
  { id: 'e-github-vps', source: 'github-ext', target: 'vps', label: 'Git sync', tooltip: 'VPS pulls vault changes from GitHub. Agent edits on VPS are pushed back. Bidirectional sync keeps all three copies in sync.' },
  { id: 'e-kb-supa', source: 'kanban', target: 'supabase-ext', label: 'Realtime', tooltip: 'Kanban board uses Supabase PostgreSQL with realtime subscriptions. Database changes trigger instant UI updates in all connected browsers.', animated: true },
  { id: 'e-lg-kb', source: 'langgraph', target: 'kanban', label: 'Agent updates', tooltip: 'LangGraph specialist agents update kanban tasks with progress, results, and status changes as they work through delegated tasks.' },
  { id: 'e-mac-vault', source: 'mac', target: 'vault', label: 'Obsidian app', tooltip: 'Dara uses the Obsidian desktop app on Mac to browse and edit the vault. Changes are committed and pushed via git sync.' },
  { id: 'e-ollama-mi', source: 'vps', target: 'memindex', label: 'Embeddings', tooltip: 'Ollama running on VPS generates vector embeddings via mxbai-embed-large model. Memindex sends text chunks to Ollama and stores the resulting vectors in LanceDB.' },
  { id: 'e-oc-vault', source: 'openclaw', target: 'vault', label: 'File access', tooltip: 'OpenClaw reads and writes Obsidian vault markdown files directly on the VPS filesystem. Used for memory updates, note creation, and knowledge base queries.' },
  { id: 'e-kb-vercel', source: 'kanban', target: 'vercel-ext', label: 'Hosted on', tooltip: 'The Kanban Next.js application is deployed and hosted on Vercel. Automatic deployments from the GitHub repository on every push.' },
  { id: 'e-oc-anthropic', source: 'openclaw', target: 'anthropic-ext', label: 'LLM calls', tooltip: 'All Claude model inference runs through the Anthropic API. Every message, tool use, and reasoning step is an API call to Anthropic\'s servers.', animated: true },
];

// External service nodes (not expandable)
export const externalNodes = [
  { id: 'telegram-ext', label: 'Telegram', icon: '💬', position: { x: 350, y: -80 }, tooltip: 'Telegram messaging platform. The user-facing interface for all interactions with the AI assistant. Chosen for its rich bot API, inline buttons, and cross-platform availability.' },
  { id: 'github-ext', label: 'GitHub', icon: '🐙', position: { x: 0, y: 380 }, tooltip: 'GitHub repository hosting the Obsidian vault. Acts as the central sync point between Mac, VPS, and any other devices. Also hosts project repositories.' },
  { id: 'supabase-ext', label: 'Supabase', icon: '⚡', position: { x: 850, y: 250 }, tooltip: 'Supabase provides the PostgreSQL database and realtime subscriptions for the Kanban board. Hosted service — no database management needed.' },
  { id: 'vercel-ext', label: 'Vercel', icon: '▲', position: { x: 770, y: 150 }, tooltip: 'Vercel hosts the Kanban board Next.js application. Provides edge deployment, automatic previews, and seamless CI/CD from the GitHub repository.' },
  { id: 'anthropic-ext', label: 'Anthropic API', icon: '🤖', position: { x: 130, y: 50 }, tooltip: 'Anthropic\'s Claude API — the LLM provider powering OpenClaw. All reasoning, code generation, and conversation runs through this API. Critical external dependency.' },
];
