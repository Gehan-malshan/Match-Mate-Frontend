export default function FormField({ label, name, type = "text", placeholder, value, onChange, options, hint, labelAction }) {
        {labelAction ? (
    <div className="flex justify-between items-center mb-3">
        <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">
        {label}
        </label>
        {labelAction}
    </div>
    ) : (
    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-3 group-focus-within:text-primary transition-colors">
        {label}
    </label>
    )
    }
}