// src/components/admin/AdminFormField.jsx

/**
 * Labeled wrapper for a single form control in the Manage Event form.
 * Renders children (the actual <input>/<select>/<textarea>) so this
 * stays input-type agnostic.
 */
import '../../styles/admin.css';

export default function AdminFormField({ label, htmlFor, fullWidth = false, children }) {
  return (
    <div className={fullWidth ? "admin-form-field admin-form-field--full" : "admin-form-field"}>
      <label className="admin-form-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}