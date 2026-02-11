import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SystemNode from './components/SystemNode';
import ExternalNode from './components/ExternalNode';
import { systemNodes, systemEdges, externalNodes } from './data/nodes';

const nodeTypes = { system: SystemNode, external: ExternalNode };

const edgeDefaults = {
  style: { stroke: '#4a4a7a', strokeWidth: 1.5 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#4a4a7a', width: 15, height: 15 },
  labelStyle: { fill: '#a0a0c0', fontSize: 11, fontWeight: 500 },
  labelBgStyle: { fill: '#0d0d18', fillOpacity: 0.9 },
  labelBgPadding: [6, 3],
  labelBgBorderRadius: 4,
};

// Custom handle mapping for cleaner edge routing
// Handle mapping for left-to-right data flow layout
const handleMap = {
  'e-oc-telegram': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Telegram → Borgella (left → centre-left)
  'e-oc-lg': { sourceHandle: null, targetHandle: null }, // Borgella ↔ LangGraph (vertical, same column)
  'e-oc-kb': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Borgella → Kanban (centre-left → centre)
  'e-oc-mac': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Borgella → Mac (centre-left → centre-right)
  'e-oc-mi': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Borgella → Memindex (centre-left → centre)
  'e-vault-github': { sourceHandle: 'left-source', targetHandle: 'right-source' }, // Vault → GitHub (centre-right → left)
  'e-github-vps': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // GitHub → VPS (left → centre)
  'e-kb-supa': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Kanban → Supabase (centre → right)
  'e-lg-kb': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // LangGraph → Kanban (centre-left → centre)
  'e-mac-vault': { sourceHandle: null, targetHandle: null }, // Mac ↔ Vault (vertical, same column)
  'e-openai-mi': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // VPS → Memindex (centre → centre)
  'e-oc-vault': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Borgella → Vault (centre-left → centre-right)
  'e-kb-vercel': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Kanban → Vercel (centre → right)
  'e-oc-anthropic': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Borgella → Anthropic (centre-left → right)
  'e-vc-bridge': { sourceHandle: 'right-source', targetHandle: 'left-target' }, // Voice Chat → VPS (left → centre)
  'e-vc-gemini': { sourceHandle: null, targetHandle: null }, // Voice Chat → Gemini (vertical)
  'e-bridge-telegram': { sourceHandle: 'left-source', targetHandle: null }, // VPS → Telegram (centre → left)
  'e-oc-claude': { sourceHandle: null, targetHandle: null }, // Borgella → VPS (vertical)
};

function App() {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const toggleNode = useCallback((id) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const flowNodes = useMemo(() => {
    const sysNodes = systemNodes.map(n => ({
      id: n.id,
      type: 'system',
      position: n.position,
      data: {
        ...n,
        position: n.position,
        expanded: expandedNodes.has(n.id),
        onToggle: () => toggleNode(n.id),
      },
    }));
    const extNodes = externalNodes.map(n => ({
      id: n.id,
      type: 'external',
      position: n.position,
      data: { ...n, position: n.position },
    }));
    return [...sysNodes, ...extNodes];
  }, [expandedNodes, toggleNode]);

  const flowEdges = useMemo(() =>
    systemEdges.map(e => {
      const handles = handleMap[e.id] || {};
      return {
        ...e,
        ...edgeDefaults,
        ...(e.animated ? { animated: true, style: { ...edgeDefaults.style, stroke: '#6366f1' } } : {}),
        ...(handles.sourceHandle ? { sourceHandle: handles.sourceHandle } : {}),
        ...(handles.targetHandle ? { targetHandle: handles.targetHandle } : {}),
      };
    }),
    []
  );

  const { fitView } = useReactFlow();

  useEffect(() => {
    const handleResize = () => fitView({ padding: 0.2 });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitView]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0f' }}>
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#e0e0f0', letterSpacing: '-0.5px' }}>
          🚀 Dara's AI System
        </h1>
        <p style={{ fontSize: 11, color: '#6060a0' }}>Click nodes to expand • Hover for details</p>
      </div>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={edgeDefaults}
      >
        <Background color="#1a1a2a" gap={20} size={1} />
        <Controls
          style={{ background: '#16162a', border: '1px solid #2a2a4a', borderRadius: 8 }}
          showInteractive={false}
        />
        {/* MiniMap removed - not rendering properly */}
      </ReactFlow>
    </div>
  );
}

function AppWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default AppWithProvider;
