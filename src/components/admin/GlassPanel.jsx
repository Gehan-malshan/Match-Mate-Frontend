// src/components/admin/GlassPanel.jsx

/**
 * Reusable "glass-panel" card surface from the mockups
 * (translucent surface + blur + faint pink border).
 */
import '../../styles/admin.css';
export default function GlassPanel({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`glass-panel ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}