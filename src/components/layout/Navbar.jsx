export default function Navbar() {
  const links = ["How it Works", "Events", "About"];

  return (
    <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <a href="#" className="font-headline-md text-headline-md font-bold text-primary hover:opacity-80 active:scale-90 transition-all">
          MatchMate
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`font-label-sm text-label-sm transition-opacity hover:opacity-80 ${
                i === 0
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary transition-colors"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">
            Login
          </a>
          <a href="#" className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-6 py-2 rounded-full hover:opacity-80 active:scale-90 transition-all">
            Join
          </a>
        </div>
      </div>
    </nav>
  );
}