// src/pages/Events.jsx
import { useState } from "react";
import { Plus, Pencil, Trash2, CalendarDays, MapPin } from "lucide-react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import FileDrop from "../components/ui/FileDrop";
import EmptyState from "../components/ui/EmptyState";
import { useEvents, useCreateEvent, useDeleteEvent } from "../hooks/useEvents";

const EMPTY_FORM = { title: "", date: "", location: "", description: "", image: null };

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const closeModal = () => {
    setModalOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent.mutate(form, { onSuccess: closeModal });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-muted">
          {events?.length ?? 0} event{events?.length === 1 ? "" : "s"} posted
        </p>
        <Button variant="gold" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Post Event
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-52 animate-pulse rounded-card border border-black/5 bg-black/[0.02] dark:border-white/10"
            />
          ))}
        </div>
      ) : events?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="overflow-hidden rounded-card border border-black/5 bg-parchment-card dark:border-white/10 dark:bg-ink-light"
            >
              <div className="h-32 w-full bg-ink/5 dark:bg-white/5">
                {event.ImageUrl && (
                  <img src={event.ImageUrl} alt={event.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="font-display font-semibold text-slate-text dark:text-parchment">
                  {event.title}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-muted">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} /> {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {event.location}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-muted">{event.description}</p>

                <div className="mt-4 flex gap-2 border-t border-black/5 pt-3 dark:border-white/10">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-card border border-black/10 py-1.5 text-xs text-slate-text hover:bg-black/5 dark:border-white/15 dark:text-parchment dark:hover:bg-white/5">
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => deleteEvent.mutate(event._id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-card border border-brick/30 py-1.5 text-xs text-brick hover:bg-brick/10"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarDays}
          title="No events posted"
          description="Announce open days, sports fixtures, and ceremonies here."
          action={
            <Button variant="gold" onClick={() => setModalOpen(true)}>
              <Plus size={16} /> Post Event
            </Button>
          }
        />
      )}

      <Modal open={modalOpen} onClose={closeModal} title="Post Event" description="Published immediately to the events page.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Event Title
            </label>
            <input
              required
              value={form.title}
              onChange={updateField("title")}
              placeholder="e.g. Founders' Day Ceremony"
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
                Date
              </label>
              <input
                required
                type="date"
                value={form.date}
                onChange={updateField("date")}
                className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
                Location
              </label>
              <input
                required
                value={form.location}
                onChange={updateField("location")}
                placeholder="e.g. Main Hall"
                className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={updateField("description")}
              placeholder="What should parents and students know?"
              className="w-full resize-none rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <FileDrop
            label="Event Image"
            file={form.image}
            onChange={(file) => setForm((f) => ({ ...f, image: file }))}
            hint="PNG or JPG, landscape recommended"
          />

          {createEvent.isError && <p className="text-sm text-brick">{createEvent.error.message}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="gold" type="submit" loading={createEvent.isPending}>
              Publish Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
