import UnderlineField from "../ui/UnderlineField";

export default function IntroductionCard({ data, onChange }) {
  return (
    <div className="bg-surface-container border border-primary/10 rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline-md text-headline-md text-on-surface">The Introduction</h3>
        <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface-variant">
          Public Bio
        </span>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block font-label-sm text-label-sm text-outline mb-3 uppercase tracking-wider">Your Mystery (Bio)</label>
          <textarea
            name="bio"
            value={data.bio}
            onChange={onChange}
            rows={4}
            placeholder="Tell them everything, without telling them anything..."
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-0 resize-none transition-all font-body-md outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UnderlineField label="Occupation Domain" name="occupation" value={data.occupation} onChange={onChange} />
          <UnderlineField
            label="Education Level"
            name="education"
            type="select"
            options={["Post-Graduate", "Graduate", "Self-Taught"]}
            value={data.education}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}