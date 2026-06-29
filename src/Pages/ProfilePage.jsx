import { useEffect, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar";
import BottomNav from "../components/layout/BottomNav";
import AvatarCard from "../components/profile/AvatarCard";
import SecurityVaultCard from "../components/profile/SecurityVaultCard";
import IntroductionCard from "../components/profile/IntroductionCard";
import LifestyleBlueprintCard from "../components/profile/LifestyleBlueprintCard";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../api/users";
import { extractErrorMessage } from "../api/client";

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrHV9fp9OErpfcHDPyA4e6iU9YkNb6j1W73swYLi4dWD-rZ7DHgxCyg3u1kph6_Hbj9_tZTHAfTCjaVFdr_82zvDcMbDCsQCmWEFfcv_X59FZTEH5FzQM7p_gC51Z9YTG-MWEq5VhD97dDuEq85v91XOYuH4P89greqt_SJtkTAb9Z5zGZLKHNg0ZUTomlYtRaLbrqnkYbr-qGsT33v6Y3f9exnNGwRhZtX09IB21k3sfEFX_tOwC8zShmRNTUTjYFqtCKA3sLp7Y";

// Fields beyond bio (occupation/traits/etc.) have no backend column yet, so they
// remain client-side only. We only persist what the UpdateProfileRequest supports.
const initialProfile = {
  bio: "",
  occupation: "",
  education: "Post-Graduate",
  traits: [],
  socialEnergy: 65,
  loveLanguage: "Quality Time",
  discoveryIntent: "Meaningful Connection",
};

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const userId = user?.userId;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [backendUser, setBackendUser] = useState(null);

  const [security, setSecurity] = useState({ currentPassword: "", newPassword: "" });
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const data = await getUserProfile(userId);
        if (cancelled) return;
        setBackendUser(data);
        setProfile((prev) => ({
          ...prev,
          bio: data.bio || "",
          traits: prev.traits,
        }));
      } catch (err) {
        if (!cancelled) setLoadError(extractErrorMessage(err, "Could not load your profile."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTrait = (trait) => setProfile((prev) => ({ ...prev, traits: [...prev.traits, trait] }));
  const handleRemoveTrait = (trait) =>
    setProfile((prev) => ({ ...prev, traits: prev.traits.filter((t) => t !== trait) }));

  const handleGenerateAvatar = () =>
    setSaveNotice("Avatar generation isn't available yet.");

  const handleUpdateCredentials = () =>
    setSaveNotice("Password updates aren't supported by the API yet.");

  const handleSaveProfile = async () => {
    if (!userId || !backendUser) return;
    setSaving(true);
    setSaveNotice("");
    try {
      // Preserve existing account fields; only bio is editable on this screen.
      const updated = await updateUserProfile(userId, {
        firstName: backendUser.firstName,
        lastName: backendUser.lastName,
        age: backendUser.age,
        gender: backendUser.gender,
        phoneNumber: backendUser.phoneNumber,
        bio: profile.bio,
        city: backendUser.city,
        country: backendUser.country,
        profileImageUrl: backendUser.profileImageUrl,
      });
      setBackendUser(updated);
      updateUser(updated);
      setSaveNotice("Your Veil has been updated.");
    } catch (err) {
      setSaveNotice(extractErrorMessage(err, "Could not save your profile."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen overflow-x-hidden">
      <AppNavbar />

      <main className="pt-32 pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <header className="mb-16 max-w-2xl">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            My Veil
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {backendUser
              ? `Welcome back, ${backendUser.firstName || "guest"}. Manage how you appear to the world while preserving the mystery of your true self.`
              : "Your identity is a curated masterpiece. Manage how you appear to the world while preserving the mystery of your true self."}
          </p>
        </header>

        {loading ? (
          <p className="text-on-surface-variant py-20 font-body-md">Loading your profile...</p>
        ) : loadError ? (
          <p className="text-red-300 py-20 font-body-md">{loadError}</p>
        ) : (
          <>
            {saveNotice && (
              <p className="mb-8 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-body-md text-sm text-primary">
                {saveNotice}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <section className="lg:col-span-5 space-y-8">
                <AvatarCard
                  avatarUrl={backendUser?.profileImageUrl || DEFAULT_AVATAR}
                  generationsLeft={3}
                  onGenerate={handleGenerateAvatar}
                />
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
                  saving={saving}
                />
              </section>
            </div>
          </>
        )}
      </main>

      <BottomNav active="Profile" />
    </div>
  );
}
