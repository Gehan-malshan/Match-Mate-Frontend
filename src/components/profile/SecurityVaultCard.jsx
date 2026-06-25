import UnderlineField from "../ui/UnderlineField";

export default function SecurityVaultCard({ currentPassword, newPassword, onChange, onUpdate }) {
  return (
    <div className="bg-surface-container border border-primary/10 rounded-xl p-8">
      <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">lock</span> Security Vault
      </h3>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onUpdate(); }}>
        <UnderlineField label="Current Password" name="currentPassword" type="password" placeholder="••••••••" value={currentPassword} onChange={onChange} uppercase={false} />
        <UnderlineField label="New Password" name="newPassword" type="password" placeholder="Enter new password" value={newPassword} onChange={onChange} uppercase={false} />

        <button type="submit" className="text-primary font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
          Update Credentials <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-outline-variant/20">
        <p className="text-[11px] text-outline leading-relaxed">
          <span className="material-symbols-outlined text-[12px] align-middle mr-1">info</span>
          Personal identifiers (legal name, email, phone) are never shown on your Veil profile and are only used for account verification.
        </p>
      </div>
    </div>
  );
}