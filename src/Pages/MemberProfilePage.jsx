import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import InfoCard from "../components/member/InfoCard";
import DiscoveryIntentCard from "../components/member/DiscoveryIntentCard";
import { members } from "../data/Members";

export default function MemberProfilePage() {
  const { memberId } = useParams();
  const member = members.find((m) => m.id === memberId);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-on-surface-variant">
        <p>This veil could not be found.</p>
        <Link to="/community" className="text-primary hover:underline">Back to Community</Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md overflow-x-hidden min-h-screen">
      <Navbar links={["Events", "Community", "Profile"]} activeLink="Community" variant="fixed" actions="profile" />

      <main className="pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <section className="flex flex-col md:flex-row items-center md:items-end gap-12 mb-20">
          <div className="relative group">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full relative overflow-hidden border-2 border-primary/20 shadow-[0_0_40px_-10px_rgba(248,55,224,0.3)]">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary-container p-3 rounded-full">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            {member.online && (
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded text-primary font-label-sm mb-2">
                ONLINE NOW
              </div>
            )}
            <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-background">{member.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">cake</span> {member.age} Years
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">{member.gender === "Male" ? "male" : "female"}</span> {member.gender}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span> {member.location}
              </span>
            </div>
            <div className="pt-6">
              <button className="group flex items-center gap-3 bg-primary text-on-primary px-10 py-4 rounded-full font-label-sm uppercase tracking-widest hover:bg-primary-container hover:shadow-[0_0_30px_rgba(248,55,224,0.4)] transition-all mx-auto md:mx-0">
                Send a Spark
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 space-y-gutter">
            <div className="glass-card p-10 rounded-xl">
              <h2 className="font-headline-md text-primary mb-6">The Introduction</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed italic">"{member.bio}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              <InfoCard icon={member.occupationIcon} label="Occupation" value={member.occupation} />
              <InfoCard icon="school" label="Education" value={member.education} />
            </div>
          </div>

          <div className="md:col-span-4 space-y-gutter">
            <div className="glass-card p-8 rounded-xl">
              <h3 className="font-headline-md text-on-surface mb-6">Lifestyle Blueprint</h3>
              <div className="flex flex-wrap gap-3">
                {member.traits.map((trait) => (
                  <span key={trait} className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-label-sm">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <DiscoveryIntentCard intent={member.discoveryIntent} note={member.discoveryNote} />
          </div>
        </div>

        <section className="mt-24 text-center">
          <div className="h-px w-32 bg-primary/30 mx-auto mb-12" />
          <p className="font-display-lg text-headline-md italic text-on-surface-variant max-w-2xl mx-auto">
            "The eyes are useless when the mind is blind."
          </p>
        </section>
      </main>

      <BottomNav active="Community" />
    </div>
  );
}
