import { useState, useEffect } from 'react';

export default function ReminderForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    pet: '',
    category: 'General',
    title: '',
    notes: '',
    time: '',
    frequency: '',
    status: 'pending',
    ...initialData,
  });

  useEffect(() => {
    if (initialData && initialData.date && !initialData.time) {
      const iso = new Date(initialData.date).toISOString().slice(0, 16);
      setForm((prev) => ({ ...prev, time: iso }));
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.pet || !form.time) {
      alert('Please fill in required fields');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-green-50 p-6 rounded-xl shadow-md">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 rounded" />
      <input name="pet" placeholder="Pet Name" value={form.pet} onChange={handleChange} className="border p-2 rounded" />
      <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
        <option>General</option>
        <option>Lifestyle</option>
        <option>Health</option>
      </select>
      <input name="time" type="datetime-local" value={form.time} onChange={handleChange} className="border p-2 rounded" />
      <input name="frequency" placeholder="Frequency (e.g. Daily)" value={form.frequency} onChange={handleChange} className="border p-2 rounded" />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">💾 Save</button>
    </form>
  );
}

