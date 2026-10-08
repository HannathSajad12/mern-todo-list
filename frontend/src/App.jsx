import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, addTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);   // B2 - all tasks live in state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // B2 - fetch all tasks once, when the page first loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Cannot reach the server. Is the backend running on port 5000?"))
      .finally(() => setLoading(false));
  }, []);

  // B3 - send the new task to POST, then add the saved task to state
  const handleAdd = async (title) => {
    try {
      setError("");
      const created = await addTask(title);
      setTasks((prev) => [...prev, created]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // B4 - flip completed through PUT, then replace that task in state
  const handleToggle = async (task) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit the title through PUT
  const handleEdit = async (task, title) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { title });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // B5 - delete through DELETE, then remove the task from state
  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="page">
      <header className="masthead">
        <h1>Task Ledger</h1>
        <p className="count">
          {tasks.length === 0 ? "Nothing on the list" : `${remaining} of ${tasks.length} still to do`}
        </p>
      </header>

      <TaskForm onAdd={handleAdd} />

      {error && <p className="error" role="alert">{error}</p>}

      {loading ? (
        <p className="hint">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
