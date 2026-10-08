import { useState } from "react";

// B3 - form to add a task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();                 // stop the page from reloading
    if (!title.trim()) return;          // front-end check; backend also validates
    const ok = await onAdd(title);
    if (ok) setTitle("");               // clear the input after a successful add
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task" className="sr-only">New task</label>
      <input
        id="new-task"
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}
