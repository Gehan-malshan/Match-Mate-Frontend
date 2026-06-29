import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "How it Works", to: "/#how-it-works", isAnchor: true },
  { label: "Events", to: "/events", isAnchor: false },
  { label: "About", to: "/about", isAnchor: false },
];

export default function Navbar() {
  const { pathname } = useLocation();

  const handleNavClick = (e, item) => {
    // If we are already on the landing page and click an anchor link, smooth scroll to it
    if (item.isAnchor && pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("how-it-works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary hover:opacity-80 active:scale-90 transition-all">
          MatchMate
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            // Determine active highlight based on current route path
            const isActive = pathname === item.to || (item.isAnchor && pathname === "/");
            
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={(e) => handleNavClick(e, item)}
                className={`font-label-sm text-label-sm transition-all hover:opacity-80 ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary transition-colors"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Login
          </Link>
          <Link to="/register" className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-6 py-2 rounded-full hover:opacity-80 active:scale-90 transition-all">
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
}
