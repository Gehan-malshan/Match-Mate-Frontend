const steps = [
  { number: "01", icon: "person_add", title: "Create Your Profile", description: "Build an expressive anonymous profile revealing your personality, interests, and what you seek — your identity stays protected.", offset: "" },
  { number: "02", icon: "favorite", title: "Browse & Like", description: "Explore curated anonymous profiles based on compatibility. Send likes to those who intrigue you based purely on their essence.", offset: "lg:mt-8" },
  { number: "03", icon: "local_activity", title: "Buy Your Ticket", description: "Secure your spot at an upcoming exclusive event. Details are shared only with confirmed attendees to maintain mystery.", offset: "lg:mt-16" },
  { number: "04", icon: "celebration", title: "Discover at Event", description: "Arrive at the venue and experience the magic — your match is revealed in person. The mystery unfolds, and genuine connection begins.", offset: "lg:mt-24" },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop bg-background">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">The Experience</span>
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">
            How <span className="italic text-primary">MatchMate</span> Works
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            A thoughtfully designed journey from anonymous discovery to real-world romance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className={`glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors mt-0 ${step.offset}`}>
              <div className="text-4xl font-headline-lg text-primary/20 absolute -top-4 -right-4 font-bold group-hover:text-primary/40 transition-colors">
                {step.number}
              </div>
              <span className="material-symbols-outlined text-primary mb-6 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {step.icon}
              </span>
              <h4 className="font-headline-md text-headline-md !text-2xl text-on-background mb-4">{step.title}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}