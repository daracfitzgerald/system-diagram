import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const StatusDot = ({ status }) => (
  <span
    style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: status === 'online' ? '#22c55e' : '#ef4444',
      boxShadow: status === 'online' ? '0 0 6px #22c55e80' : '0 0 6px #ef444480',
      marginRight: 6,
      flexShrink: 0,
    }}
  />
);

const Tooltip = ({ text, children, flipBelow }) => {
  const [show, setShow] = useState(false);
  const posStyle = flipBelow
    ? { top: '100%', marginTop: 4 }
    : { bottom: '100%', marginBottom: 4 };
  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: '100%' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
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
          width: 260,
          zIndex: 1000,
          pointerEvents: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

const ChildItem = ({ child }) => (
  <Tooltip text={child.tooltip}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '3px 0',
      fontSize: 11,
      color: '#b0b0c0',
      cursor: 'default',
      width: '100%',
    }}>
      <StatusDot status={child.status} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{child.label}</span>
    </div>
  </Tooltip>
);

function SystemNode({ data }) {
  const { label, subtitle, icon, status, tooltip, children, expanded, onToggle, position } = data;
  const hasChildren = children && children.length > 0;
  const [hovered, setHovered] = useState(false);
  const isTopRow = position && position.y < 100;

  const borderColor = expanded ? '#6366f180' : hovered ? '#6366f160' : '#2a2a4a';
  const shadow = expanded
    ? '0 0 20px #6366f120'
    : hovered
      ? '0 0 15px #6366f115'
      : '0 2px 10px rgba(0,0,0,0.3)';

  return (
    <Tooltip text={tooltip} flipBelow={isTopRow}>
      <div
        onClick={(e) => { e.stopPropagation(); if (hasChildren) onToggle(); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #16162a 0%, #1a1a35 100%)',
          border: `1px solid ${borderColor}`,
          borderRadius: 12,
          padding: '12px 16px',
          minWidth: expanded ? 220 : 180,
          maxWidth: 260,
          cursor: hasChildren ? 'pointer' : 'default',
          boxShadow: shadow,
          transition: 'all 0.2s ease',
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: '#6366f1', width: 8, height: 8, border: '2px solid #1a1a35' }} />
        <Handle type="source" position={Position.Bottom} style={{ background: '#6366f1', width: 8, height: 8, border: '2px solid #1a1a35' }} />
        <Handle type="target" position={Position.Left} id="left-target" style={{ background: '#6366f1', width: 8, height: 8, border: '2px solid #1a1a35' }} />
        <Handle type="source" position={Position.Right} id="right-source" style={{ background: '#6366f1', width: 8, height: 8, border: '2px solid #1a1a35' }} />
        <Handle type="target" position={Position.Right} id="right-target" style={{ background: '#6366f1', width: 8, height: 8, border: '2px solid #1a1a35' }} />
        <Handle type="source" position={Position.Left} id="left-source" style={{ background: '#6366f1', width: 8, height: 8, border: '2px solid #1a1a35' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <StatusDot status={status} />
              <span style={{ fontWeight: 600, fontSize: 13, color: '#e0e0f0' }}>{label}</span>
            </div>
            {subtitle && <div style={{ fontSize: 10, color: '#707090', marginTop: 1 }}>{subtitle}</div>}
          </div>
          {hasChildren && (
            <span style={{ fontSize: 10, color: '#6366f1', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          )}
        </div>

        {expanded && children && (
          <div style={{ marginTop: 8, borderTop: '1px solid #2a2a4a', paddingTop: 6 }}>
            {children.map(child => <ChildItem key={child.id} child={child} />)}
          </div>
        )}
      </div>
    </Tooltip>
  );
}

export default memo(SystemNode);
