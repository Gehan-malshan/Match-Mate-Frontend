import { useState } from "react";
import AppNavbar from "../components/layout/AppNavbar";
import BottomNav from "../components/layout/BottomNav";
import AvatarCard from "../components/profile/AvatarCard";
import SecurityVaultCard from "../components/profile/SecurityVaultCard";
import IntroductionCard from "../components/profile/IntroductionCard";
import LifestyleBlueprintCard from "../components/profile/LifestyleBlueprintCard";

// Replace with the user's actual generated avatar URL/asset
const avatarImg = "/assets/current-avatar.jpg";

export default function ProfilePage() {
  const [security, setSecurity] = useState({ currentPassword: "", newPassword: "" });
  const [profile, setProfile] = useState({
    bio: "I find solace in jazz clubs at 2 AM and believe the best conversations happen over a glass of old-world red. Searching for someone who appreciates the silence as much as the symphony.",
    occupation: "Architecture & Design",
    education: "Post-Graduate",
    traits: ["Wine Lover", "Night Owl", "Introvert"],
    socialEnergy: 65,
    loveLanguage: "Quality Time",
    discoveryIntent: "Meaningful Connection",
  });

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTrait = (trait) => setProfile((prev) => ({ ...prev, traits: [...prev.traits, trait] }));
  const handleRemoveTrait = (trait) => setProfile((prev) => ({ ...prev, traits: prev.traits.filter((t) => t !== trait) }));

  const handleGenerateAvatar = () => console.log("Generating new avatar...");
  const handleUpdateCredentials = () => console.log("Updating credentials...", security);
  const handleSaveProfile = () => console.log("Saving profile...", profile);

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="pt-32 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <header className="mb-16 max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">My Veil</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Your identity is a curated masterpiece. Manage how you appear to the world while preserving the mystery of your true self.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <section className="lg:col-span-5 space-y-8">
                    <AvatarCard avatarUrl={avatarImg} generationsLeft={3} onGenerate={handleGenerateAvatar} />
                    <SecurityVaultCard
                    currentPassword={security.currentPassword}
                    newPassword={security.newPassword}
                    onChange={handleSecurityChange}
                    onUpdate={handleUpdateCredentials}
                    />
                </section>

                <section className="lg:col-span-7 space-y-8">
                    <IntroductionCard data={profile} onChange={handleProfileChange} />
                    <LifestyleBlueprintCard
                    data={profile}
                    onChange={handleProfileChange}
                    onAddTrait={handleAddTrait}
                    onRemoveTrait={handleRemoveTrait}
                    onSave={handleSaveProfile}
                    />
                </section>
        </div>
      </main>

      <BottomNav active="Profile" />
    </div>
  );
}
