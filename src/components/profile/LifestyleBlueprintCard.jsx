import { useState } from "react";

const intentOptions = ["Slow Burn", "Meaningful Connection", "Curiosity"];

export default function LifestyleBlueprintCard({ data, onChange, onRemoveTrait, onAddTrait, onSave, saving }) {
  const [newTrait, setNewTrait] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddTrait = () => {
    if (newTrait.trim()) {
      onAddTrait(newTrait.trim());
      setNewTrait("");
      setShowInput(false);
    }
  };

  return (
    <div className="bg-surface-container border border-primary/10 rounded-xl p-8">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-8">Lifestyle Blueprint</h3>

      <div className="space-y-10">
        <div>
          <p className="font-label-sm text-label-sm text-outline mb-4 uppercase tracking-wider">Core Archetypes (Traits)</p>
          <div className="flex flex-wrap gap-3">
            {data.traits.map((trait) => (
              <button
                key={trait}
                onClick={() => onRemoveTrait(trait)}
                className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-2 transition-all hover:opacity-80"
              >
                {trait} <span className="material-symbols-outlined text-sm">close</span>
              </button>
            ))}

            {showInput ? (
              <input
                autoFocus
                value={newTrait}
                onChange={(e) => setNewTrait(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTrait()}
                onBlur={handleAddTrait}
                placeholder="New trait..."
                className="bg-transparent border-b border-primary text-on-surface text-sm px-2 py-2 outline-none w-32"
              />
            ) : (
              <button
                onClick={() => setShowInput(true)}
                className="px-4 py-2 rounded-full border border-outline-variant bg-surface-container-high hover:border-primary transition-colors font-label-sm text-label-sm flex items-center gap-2 group"
              >
                <span className="material-symbols-outlined text-sm group-hover:text-primary">add</span> Add Trait
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className="block font-label-sm text-label-sm text-outline mb-6 uppercase tracking-wider">Social Energy</label>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                name="socialEnergy"
                value={data.socialEnergy}
                onChange={onChange}
                className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-3 font-label-sm text-[10px] text-outline opacity-60">
                <span>HERMIT</span>
                <span>SOCIALITE</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-outline mb-3 uppercase tracking-wider">Love Language</label>
            <select
              name="loveLanguage"
              value={data.loveLanguage}
              onChange={onChange}
              className="w-full bg-transparent border-0 border-b border-outline-variant py-2 focus:border-primary focus:ring-0 cursor-pointer outline-none"
            >
              {["Quality Time", "Physical Touch", "Acts of Service", "Words of Affirmation", "Gifts"].map((opt) => (
                <option key={opt} value={opt} className="bg-surface-container">{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-outline mb-4 uppercase tracking-wider">Discovery Intent</label>
          <div className="grid grid-cols-3 gap-3">
            {intentOptions.map((option) => (
              <button
                key={option}
                onClick={() => onChange({ target: { name: "discoveryIntent", value: option } })}
                className={
                  data.discoveryIntent === option
                    ? "py-3 rounded-lg bg-primary text-on-primary font-label-sm shadow-lg shadow-primary/20"
                    : "py-3 rounded-lg border border-outline-variant text-on-surface-variant font-label-sm hover:border-primary transition-all"
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="text-on-surface-variant font-label-sm text-xs italic">All changes are encrypted and private.</p>
        <button
          onClick={onSave}
          disabled={saving}
          className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary font-bold rounded-xl hover:shadow-[0_0_15px_rgba(248,55,224,0.4)] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save My Veil"}
        </button>
      </div>
    </div>
  );
}