// src/pages/Academics.jsx
import { useState } from "react";
import { Plus, Pencil, Trash2, GraduationCap, Paperclip } from "lucide-react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import FileDrop from "../components/ui/FileDrop";
import EmptyState from "../components/ui/EmptyState";
import {
  useAcademicPosts,
  useCreateAcademicPost,
  useDeleteAcademicPost,
} from "../hooks/useAcademics";

const GRADE_LEVELS = ["Nursery", "Primary", "Junior Secondary", "Senior Secondary"];
const EMPTY_FORM = { gradeLevel: GRADE_LEVELS[0], title: "", description: "", attachment: null };

export default function Academics() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: posts, isLoading } = useAcademicPosts();
  const createPost = useCreateAcademicPost();
  const deletePost = useDeleteAcademicPost();

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const closeModal = () => {
    setModalOpen(false);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost.mutate(form, { onSuccess: closeModal });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-muted">
          {posts?.length ?? 0} academic post{posts?.length === 1 ? "" : "s"}
        </p>
        <Button variant="gold" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Academic Post
        </Button>
      </div>

      <div className="overflow-hidden rounded-card border border-black/5 dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/[0.02] text-xs uppercase tracking-wide text-slate-muted dark:bg-white/[0.03]">
            <tr>
              <th className="px-4 py-3 font-medium">Grade Level</th>
              <th className="px-4 py-3 font-medium">Curriculum Title</th>
              <th className="px-4 py-3 font-medium">Attachment</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-parchment-card dark:divide-white/10 dark:bg-ink-light">
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-4" colSpan={4}>
                    <div className="h-4 w-full animate-pulse rounded bg-black/5 dark:bg-white/10" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              posts?.map((post) => (
                <tr key={post._id}>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold-muted">
                      {post.gradeLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-text dark:text-parchment">{post.title}</p>
                    <p className="line-clamp-1 text-xs text-slate-muted">{post.description}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-muted">
                    {post.attachmentUrl ? (
                      <a
                        href={post.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-ink hover:underline dark:text-gold-soft"
                      >
                        <Paperclip size={13} /> View file
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-card border border-black/10 p-1.5 text-slate-text hover:bg-black/5 dark:border-white/15 dark:text-parchment dark:hover:bg-white/5">
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deletePost.mutate(post.id)}
                        className="rounded-card border border-brick/30 p-1.5 text-brick hover:bg-brick/10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!isLoading && posts?.length === 0 && (
          <div className="p-2">
            <EmptyState
              icon={GraduationCap}
              title="No academic posts yet"
              description="Publish curriculum overviews and syllabus documents by grade level."
              action={
                <Button variant="gold" onClick={() => setModalOpen(true)}>
                  <Plus size={16} /> Add Academic Post
                </Button>
              }
            />
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Add Academic Post"
        description="Curriculum announcements appear under the matching grade level."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Grade Level
            </label>
            <select
              value={form.gradeLevel}
              onChange={updateField("gradeLevel")}
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15 dark:bg-ink-light"
            >
              {GRADE_LEVELS.map((level) => (
                <option key={level} value={level} className="text-slate-text">
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-text dark:text-parchment">
              Curriculum Title
            </label>
            <input
              required
              value={form.title}
              onChange={updateField("title")}
              placeholder="e.g. Senior Secondary Science Track"
              className="w-full rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
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
              placeholder="Summarize what this curriculum covers"
              className="w-full resize-none rounded-card border border-slate-text/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold dark:border-white/15"
            />
          </div>

          <FileDrop
            label="Syllabus Attachment"
            accept="image/*,application/pdf"
            file={form.attachment}
            onChange={(file) => setForm((f) => ({ ...f, attachment: file }))}
            hint="PDF or image of the syllabus"
          />

          {createPost.isError && <p className="text-sm text-brick">{createPost.error.message}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="gold" type="submit" loading={createPost.isPending}>
              Save Post
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
