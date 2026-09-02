// src/components/ui/FileDrop.jsx
import { UploadCloud, FileText } from "lucide-react";
import { useRef, useState } from "react";

/**
 * Controlled file input styled as a drop zone.
 * @param {{label:string, accept?:string, file:File|null, onChange:(file:File|null)=>void, hint?:string}} props
 */
export default function FileDrop({ label, accept = "image/*", file, onChange, hint }) {
  const inputRef = useRef(null);
  const [isImage] = useState(() => accept.includes("image"));

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer items-center gap-3 rounded-card border border-dashed border-slate-text/20 bg-black/[0.02] px-4 py-3 text-sm text-slate-muted hover:border-gold/60 hover:bg-gold/5 dark:border-white/15 dark:bg-white/[0.02]"
      >
        {file && isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="h-10 w-10 rounded object-cover"
          />
        ) : file ? (
          <FileText size={20} className="text-gold-muted" />
        ) : (
          <UploadCloud size={20} className="text-slate-muted" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-slate-text dark:text-parchment">
            {file ? file.name : "Click to upload"}
          </p>
          {hint && !file && <p className="text-xs text-slate-muted">{hint}</p>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}
