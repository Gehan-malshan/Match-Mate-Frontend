import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Events", path: "/events" },
  { label: "Community", path: "/community" },
  { label: "Profile", path: "/profile" },
];

export default function AppNavbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-surface/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
        <Link
          to="/"
          className="font-headline-md text-headline-md font-bold text-primary transition-all hover:opacity-80 active:scale-95"
        >
          MatchMate
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-label-sm text-label-sm uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-b-2 border-primary pb-1 text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/profile"
          aria-label="Open profile"
          className="grid size-11 place-items-center rounded-full border border-primary/40 bg-surface-container-low text-primary shadow-[0_0_18px_rgba(255,172,233,0.14)] transition-all hover:border-primary hover:bg-primary/10 active:scale-95"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_circle
          </span>
        </Link>
      </div>
    </nav>
  );
}
