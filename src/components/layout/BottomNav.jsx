import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Events", icon: "event", path: "/events" },
  { label: "Community", icon: "group", path: "/community" },
  { label: "Profile", icon: "person", path: "/profile" },
];

export default function BottomNav({ active }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-surface-container/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] rounded-t-xl">
      {navItems.map((item) => {
        const isActive = item.label === active;
        return (
          <NavLink
            key={item.label}
            to={item.path}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-primary-container/20 text-primary rounded-full px-6 py-2 active:scale-90 transition-all"
                : "flex flex-col items-center justify-center text-on-surface-variant/70 px-6 py-2 hover:text-primary transition-colors active:scale-90"
            }
          >
            <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm mt-1">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
