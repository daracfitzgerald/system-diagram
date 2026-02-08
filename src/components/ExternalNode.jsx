import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

function ExternalNode({ data }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { label, icon, tooltip, position } = data;
  const isTopRow = position && position.y < 100;
  const posStyle = isTopRow
    ? { top: '100%', marginTop: 4 }
    : { bottom: '100%', marginBottom: 4 };

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div style={{
          position: 'absolute',
          ...posStyle,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1a1a2e',
          border: '1px solid #333355',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 11,
          lineHeight: 1.4,
          color: '#c0c0d0',
          width: 240,
          zIndex: 1000,
          pointerEvents: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          {tooltip}
        </div>
      )}
      <Handle type="target" position={Position.Top} style={{ background: '#8b5cf6', width: 6, height: 6 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#8b5cf6', width: 6, height: 6 }} />
      <Handle type="target" position={Position.Left} id="left-target" style={{ background: '#8b5cf6', width: 6, height: 6 }} />
      <Handle type="source" position={Position.Right} id="right-source" style={{ background: '#8b5cf6', width: 6, height: 6 }} />
      <Handle type="target" position={Position.Right} id="right-target" style={{ background: '#8b5cf6', width: 6, height: 6 }} />
      <Handle type="source" position={Position.Left} id="left-source" style={{ background: '#8b5cf6', width: 6, height: 6 }} />
      <div style={{
        background: '#12121f',
        border: '1px dashed #3a3a5a',
        borderRadius: 10,
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 12, color: '#9090b0', fontWeight: 500 }}>{label}</span>
      </div>
    </div>
  );
}

export default memo(ExternalNode);
