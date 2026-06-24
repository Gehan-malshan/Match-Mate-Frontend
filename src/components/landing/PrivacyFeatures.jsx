const features = [
  {
    icon: "lock",
    title: "Complete Privacy Protection",
    description: "Your real name, contact details, and personal information remain completely hidden. Only your chosen nickname and interests are visible to others.",
  },
  {
    icon: "psychology",
    title: "Intelligent Compatibility Scoring",
    description: "Our matchmaking engine analyzes shared interests, personality traits, relationship goals, and mutual activity to generate deeply compatible matches.",
  },
  {
    icon: "verified_user",
    title: "Safe & Verified Community",
    description: "Every member undergoes a vetting process to ensure a safe, respectful environment for all attendees.",
  },
];

const featureImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDjJLfEyQmlB-9XeLbQDdMYAPoc8J-FJw5WD_NTefib5xNoW5yVdOU_SeoeKcRgGTf8scFXkEypmeYVdxvWEBQpqP5Xg0i0QLnyE3O41oedRjPjAKsoZC7AIRV5OUsGWyZm0Vlj7Z0tMbJNfl1UVaXucX6vQMSn39O9TmxEA5CriVXTJpY3J5ue7PO8Qas8-USJ_J3S2kNyFnG48ZYQm_mblI_cLqU-Mif2-SB6ehKtCL50mfqb8LUr8oLHetnre3b-GLmjBwWSnPA";

export default function PrivacyFeatures() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-[600px] rounded-2xl overflow-hidden glass-panel order-2 lg:order-1">
          <img src={featureImg} alt="Couple close together in soft light" className="object-cover w-full h-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="flex flex-col gap-8 order-1 lg:order-2">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">Why MatchMate</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              Privacy Meets <br />
              <span className="text-gradient italic">Chemistry</span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
              We designed our experience around one belief: the best connections happen when we remove visual bias and let personality lead.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4 p-4 rounded-xl hover:bg-surface/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-lg h-fit">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {feature.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md !text-xl text-on-background mb-2">{feature.title}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}