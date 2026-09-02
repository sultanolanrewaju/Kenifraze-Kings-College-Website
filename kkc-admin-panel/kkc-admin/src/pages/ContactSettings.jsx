// src/pages/ContactSettings.jsx
import { useEffect, useState } from "react";
import { Save, Plus, Trash2, CheckCircle2 } from "lucide-react";
import Button from "../components/ui/Button";
import { useContactInfo, useUpdateContactInfo } from "../hooks/useContact";

const EMPTY_STATE = {
  address: "",
  email: "",
  phones: [""],
  socials: [{ platform: "Facebook", url: "" }],
};

export default function ContactSettings() {
  const { data, isLoading } = useContactInfo();
  const updateContact = useUpdateContactInfo();
  const [form, setForm] = useState(EMPTY_STATE);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const updatePhone = (index, value) =>
    setForm((f) => ({ ...f, phones: f.phones.map((p, i) => (i === index ? value : p)) }));

  const addPhone = () => setForm((f) => ({ ...f, phones: [...f.phones, ""] }));
  const removePhone = (index) =>
    setForm((f) => ({ ...f, phones: f.phones.filter((_, i) => i !== index) }));

  const updateSocial = (index, key, value) =>
    setForm((f) => ({
      ...f,
      socials: f.socials.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));

  const addSocial = () =>
    setForm((f) => ({ ...f, socials: [...f.socials, { platform: "Instagram", url: "" }] }));
  const removeSocial = (index) =>
    setForm((f) => ({ ...f, socials: f.socials.filter((_, i) => i !== index) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContact.mutate(form, {
      onSuccess: () => {
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 2500);
      },
    });
  };

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-card bg-black/[0.03] dark:bg-white/5" />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="rounded-card border border-black/5 bg-parchment-card p-5 dark:border-white/10 dark:bg-ink-light">
        <h2 className="font-display text-base font-semibold text-slate-text dark:text-parchment">
          General
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              School Address
            </label>
            <textarea
              rows={2}
              required
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="w-full resize-none rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Official Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>
        </div>
      </div>

      <div className="rounded-card border border-black/5 bg-parchment-card p-5 dark:border-white/10 dark:bg-ink-light">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-slate-text dark:text-parchment">
            Phone Lines
          </h2>
          <button
            type="button"
            onClick={addPhone}
            className="flex items-center gap-1 text-sm text-gold-muted hover:underline"
          >
            <Plus size={14} /> Add line
          </button>
        </div>
        <div className="mt-4 space-y-2.5">
          {form.phones.map((phone, i) => (
            <div key={i} className="flex gap-2">
              <input
                required
                value={phone}
                onChange={(e) => updatePhone(i, e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
              />
              {form.phones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(i)}
                  className="rounded-card border border-brick/30 px-2.5 text-brick hover:bg-brick/10"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-card border border-black/5 bg-parchment-card p-5 dark:border-white/10 dark:bg-ink-light">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-slate-text dark:text-parchment">
            Social Links
          </h2>
          <button
            type="button"
            onClick={addSocial}
            className="flex items-center gap-1 text-sm text-gold-muted hover:underline"
          >
            <Plus size={14} /> Add link
          </button>
        </div>
        <div className="mt-4 space-y-2.5">
          {form.socials.map((social, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={social.platform}
                onChange={(e) => updateSocial(i, "platform", e.target.value)}
                placeholder="Platform"
                className="w-32 shrink-0 rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
              />
              <input
                value={social.url}
                onChange={(e) => updateSocial(i, "url", e.target.value)}
                placeholder="https://"
                className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
              />
              <button
                type="button"
                onClick={() => removeSocial(i)}
                className="rounded-card border border-brick/30 px-2.5 text-brick hover:bg-brick/10"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {updateContact.isError && (
        <p className="text-sm text-brick">{updateContact.error.message}</p>
      )}

      <div className="flex items-center gap-3">
        <Button variant="gold" type="submit" loading={updateContact.isPending}>
          <Save size={16} /> Save Changes
        </Button>
        {savedFlash && (
          <span className="flex items-center gap-1.5 text-sm text-forest">
            <CheckCircle2 size={15} /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
