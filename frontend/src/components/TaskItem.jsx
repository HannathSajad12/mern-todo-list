import { useState } from "react";

// One row: checkbox (B4), title (struck through when done), edit and delete (B5)
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = async () => {
    if (!draft.trim()) return;
    const ok = await onEdit(task, draft);
    if (ok) setEditing(false);
  };

  const cancel = () => {
    setDraft(task.title);
    setEditing(false);
  };

  return (
    <li className={task.completed ? "task done" : "task"}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
      />

      {editing ? (
        <>
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            autoFocus
          />
          <button className="link" onClick={save}>Save</button>
          <button className="link" onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <span className="title">{task.title}</span>
          <button className="link" onClick={() => setEditing(true)}>Edit</button>
          <button className="link danger" onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </li>
  );
}
