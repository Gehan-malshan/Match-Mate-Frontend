// src/components/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

/**
 * Shell layout for the entire /admin/* route tree.
 * Each page renders its own header inside <Outlet /> via
 * <AdminPageHeader /> (see components/admin/AdminPageHeader.jsx),
 * matching the mockups where the title sits inside the scrolling
 * content area rather than a shared fixed bar.
 */
export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-layout__main">
        <header className="admin-topbar">
          <span className="material-symbols-outlined admin-topbar__menu-icon">menu</span>
          <div className="admin-topbar__right">
            <span className="material-symbols-outlined admin-topbar__icon-btn">notifications</span>
            <span className="material-symbols-outlined admin-topbar__icon-btn">account_circle</span>
          </div>
        </header>
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}