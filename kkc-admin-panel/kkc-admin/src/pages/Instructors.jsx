// src/pages/Instructors.jsx
import { useState } from "react";
import { Plus, Pencil, Trash2, Users, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import FileDrop from "../components/ui/FileDrop";
import EmptyState from "../components/ui/EmptyState";
import {
  useInstructors,
  useCreateInstructor,
  useDeleteInstructor,
} from "../hooks/useInstructors";

const EMPTY_FORM = { name: "", role: "", bio: "", email: "", image: null };

export default function Instructors() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: instructors, isLoading } = useInstructors();
  const createInstructor = useCreateInstructor();
  const deleteInstructor = useDeleteInstructor();

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const closeModal = () => {
    setModalOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createInstructor.mutate(form, { onSuccess: closeModal });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-muted">
          {instructors?.length ?? 0} instructor{instructors?.length === 1 ? "" : "s"} on record
        </p>
        <Button variant="gold" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Instructor
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-card border border-black/5 bg-black/[0.02] dark:border-white/10"
            />
          ))}
        </div>
      ) : instructors?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="rounded-card border border-black/5 bg-parchment-card p-4 dark:border-white/10 dark:bg-ink-light"
            >
              <div className="flex items-start gap-3">
                <img
                  src={
                    instructor.imageUrl ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      instructor.name
                    )}&backgroundColor=B8902E&textColor=ffffff`
                  }
                  alt={instructor.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-semibold text-slate-text dark:text-parchment">
                    {instructor.name}
                  </p>
                  <p className="truncate text-sm text-gold-muted">{instructor.role}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-slate-muted">{instructor.bio}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-muted">
                <Mail size={12} /> {instructor.email}
              </p>

              <div className="mt-4 flex gap-2 border-t border-black/5 pt-3 dark:border-white/10">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-card border border-black/10 py-1.5 text-xs text-slate-text hover:bg-black/5 dark:border-white/15 dark:text-parchment dark:hover:bg-white/5">
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => deleteInstructor.mutate(instructor.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-card border border-brick/30 py-1.5 text-xs text-brick hover:bg-brick/10"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No instructors yet"
          description="Add teaching staff profiles so they appear on the public site."
          action={
            <Button variant="gold" onClick={() => setModalOpen(true)}>
              <Plus size={16} /> Add Instructor
            </Button>
          }
        />
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Add Instructor"
        description="This profile appears on the public Instructors page."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Full Name
            </label>
            <input
              required
              value={form.name}
              onChange={updateField("name")}
              placeholder="e.g. Mrs. Adaeze Nwosu"
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Role / Subject
            </label>
            <input
              required
              value={form.role}
              onChange={updateField("role")}
              placeholder="e.g. Head of Mathematics"
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Bio
            </label>
            <textarea
              required
              rows={3}
              value={form.bio}
              onChange={updateField("bio")}
              placeholder="Short teaching background and specialties"
              className="w-full resize-none rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={updateField("email")}
              placeholder="name@kenifrazekings.edu.ng"
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <FileDrop
            label="Profile Image"
            file={form.image}
            onChange={(file) => setForm((f) => ({ ...f, image: file }))}
            hint="PNG or JPG, square photo recommended"
          />

          {createInstructor.isError && (
            <p className="text-sm text-brick">{createInstructor.error.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="gold" type="submit" loading={createInstructor.isPending}>
              Save Instructor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
