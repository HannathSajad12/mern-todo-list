// B6 - every action goes through these functions, which call the backend with fetch.
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/tasks";

// Shared helper: sends the request and throws a readable Error if the server says no
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

const json = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

// GET /api/tasks
export const getTasks = () => request(BASE);

// POST /api/tasks
export const addTask = (title) => request(BASE, json("POST", { title }));

// PUT /api/tasks/:id  (changes can be { completed } and/or { title })
export const updateTask = (id, changes) => request(`${BASE}/${id}`, json("PUT", changes));

// DELETE /api/tasks/:id
export const deleteTask = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
