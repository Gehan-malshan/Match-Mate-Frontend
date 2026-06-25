export default function AvatarCard({ avatarUrl, generationsLeft, onGenerate, isGenerating }) {
  return (
    <div className="bg-surface-container border border-primary/10 rounded-xl p-8 text-center relative overflow-hidden group">
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20">
        <img
          src={avatarUrl}
          alt="Current AI-generated avatar"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent flex items-end justify-center pb-4">
          <span className="font-label-sm text-label-sm text-primary">Current Veil</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-headline-md text-headline-md text-on-surface">AI Identity Sculptor</h3>
        <p className="text-on-surface-variant font-body-md text-sm">
          Don't like your current face? Let the AI forge a new anonymous masterpiece based on your essence.
        </p>
        <div className="pt-4">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(248,55,224,0.4)] active:scale-95 transition-all disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <span>Sculpting...</span>
                <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
              </>
            ) : (
              <>
                <span>Generate New Avatar</span>
                <span className="material-symbols-outlined text-[20px]">magic_button</span>
              </>
            )}
          </button>
          <p className="mt-4 text-[11px] uppercase tracking-widest text-outline">
            {generationsLeft} generations remaining this month
          </p>
        </div>
      </div>
    </div>
  );
}