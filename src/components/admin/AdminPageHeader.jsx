// src/components/admin/AdminPageHeader.jsx

/**
 * Generic content-area header. Supports either the compact two-line
 * "Manage / Event" style (Image 1) or the big display-serif title +
 * italic tagline style (Image 2) via the `variant` prop.
 */
import '../../styles/admin.css';

export default function AdminPageHeader({
  variant = "compact",
  eyebrow,
  title,
  accentTitle,
  tagline,
}) {
  if (variant === "display") {
    return (
      <div className="admin-page-header admin-page-header--display">
        <h1 className="admin-page-header__display-title">{title}</h1>
        {tagline && (
          <p className="admin-page-header__tagline">{tagline}</p>
        )}
      </div>
    );
  }

  return (
    <div className="admin-page-header admin-page-header--compact">
      <h2 className="admin-page-header__compact-title">
        {eyebrow} <span className="admin-page-header__accent">{accentTitle}</span>
      </h2>
    </div>
  );
}