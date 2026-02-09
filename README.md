# Dara's AI System Diagram

Interactive system architecture diagram built with React Flow. Visualises all components of Dara's AI system - OpenClaw, kanban board, Obsidian vault, voice bridge, and supporting infrastructure.

## Features

- Interactive node graph with expandable sub-components
- Hover tooltips with component details
- Status indicators (green = active, amber = in progress)
- Responsive layout with auto-fit on resize
- Dark theme

## Live

- **Public**: https://diagram.darafitzgerald.co.uk
- **Tailscale**: http://100.69.233.8:5051

## Tech Stack

- React + Vite
- React Flow
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## Data

Node and edge definitions in `src/data/nodes.js`. Add new system components there.
