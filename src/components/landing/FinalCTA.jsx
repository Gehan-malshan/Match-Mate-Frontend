import Button from "../ui/Button";

const bgImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBdTqWjCnxrlR_e84PB0UCVPDRAz3ANThHKPs2FBrimevGllmy13lNZpv7W4mFs2nK07XZk8GEhSBbpj2AbhBZULasVc3Vu4HWtQcSphyM2FOb1YGwEfUxfkrBgiYMNfPdk5Zbc3tgpEs8DMxq8ah3Ix-GWI9s02MlrvT4G3wJnCSJhoFEP5RLoMir8DjEvRaZTg2uiUkVlWcEvuD4VzfFz5NrwzjCnywlQoM2101dUos0mGOVCj-Oqqz8jXLT5zgMRM6p_EvojF50";

export default function FinalCTA() {
  return (
    <section className="relative py-32 px-margin-mobile md:px-margin-desktop overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="bg-cover bg-center w-full h-full opacity-20 filter blur-sm" style={{ backgroundImage: `url('${bgImg}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">Begin Your Story</span>
        <h2 className="font-display-lg text-display-lg text-on-background mb-6">
          Ready to Meet <br />
          Your <span className="text-gradient italic">Match?</span>
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl">
          Join thousands of members who chose mystery over algorithms. Your next great love story could begin at our next event.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/events" variant="primary" icon="arrow_forward">Explore Event</Button>
          <Button href="/register" variant="outline">Create Profile</Button>
        </div>
      </div>
    </section>
  );
}
