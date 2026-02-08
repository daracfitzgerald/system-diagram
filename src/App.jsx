import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
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
  labelStyle: { fill: '#8080a0', fontSize: 10, fontWeight: 500 },
  labelBgStyle: { fill: '#0d0d18', fillOpacity: 0.9 },
  labelBgPadding: [6, 3],
  labelBgBorderRadius: 4,
};

// Custom handle mapping for cleaner edge routing
const handleMap = {
  'e-oc-telegram': { sourceHandle: null, targetHandle: null }, // top-bottom
  'e-oc-lg': { sourceHandle: 'left-source', targetHandle: 'right-target' },
  'e-oc-kb': { sourceHandle: 'right-source', targetHandle: 'left-target' },
  'e-oc-mac': { sourceHandle: null, targetHandle: null },
  'e-oc-mi': { sourceHandle: null, targetHandle: null },
  'e-vault-github': { sourceHandle: 'left-source', targetHandle: null },
  'e-github-vps': { sourceHandle: 'right-source', targetHandle: 'left-target' },
  'e-kb-supa': { sourceHandle: 'right-source', targetHandle: 'left-target' },
  'e-lg-kb': { sourceHandle: 'right-source', targetHandle: 'left-target' },
  'e-mac-vault': { sourceHandle: 'left-source', targetHandle: 'right-target' },
  'e-ollama-mi': { sourceHandle: null, targetHandle: null },
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
        expanded: expandedNodes.has(n.id),
        onToggle: () => toggleNode(n.id),
      },
    }));
    const extNodes = externalNodes.map(n => ({
      id: n.id,
      type: 'external',
      position: n.position,
      data: n,
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
          🏗️ OpenClaw System Architecture
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
        <MiniMap
          style={{ background: '#0d0d18', border: '1px solid #2a2a4a', borderRadius: 8 }}
          nodeColor={() => '#6366f1'}
          maskColor="rgba(0,0,0,0.7)"
        />
      </ReactFlow>
    </div>
  );
}

export default App;
