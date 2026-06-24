const links = ["Privacy Policy", "Terms of Service", "Contact Us", "FAQ"];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-white/5">
      <div className="flex flex-col items-center gap-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <a href="#" className="font-headline-md text-headline-md font-bold text-primary">MatchMate</a>
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a key={link} href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors">
              {link}
            </a>
          ))}
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant/50 text-sm mt-4">
          © 2024 MatchMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}