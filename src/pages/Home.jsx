import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CalendarStrip from '../components/CalendarStrip';
import FilterBar from '../components/FilterBar';
import { fetchReminders, updateReminder, deleteReminder } from '../services/reminderService';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState({ pet: '', category: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const loadReminders = async () => {
      const data = await fetchReminders();
      setReminders(data);
    };
    loadReminders();
  }, []);

  const handleComplete = async (reminderId) => {
    const updated = await updateReminder(reminderId, { status: 'completed' });
    setReminders((prev) =>
      prev.map((r) => (r._id === reminderId ? { ...r, ...updated } : r))
    );
  };

  const handleDelete = async (reminderId) => {
    await deleteReminder(reminderId);
    setReminders((prev) => prev.filter((r) => r._id !== reminderId));
  };

  const handleEdit = (reminderId) => {
    navigate(`/reminder/${reminderId}`);
  };

  const filteredReminders = reminders
    .filter((r) => {
      const reminderDate = new Date(r.date).toDateString();
      const selectedDay = selectedDate.toDateString();
      const petMatch = filter.pet
        ? (r.pet ?? '').toLowerCase().includes(filter.pet.toLowerCase())
        : true;
      const catMatch = filter.category ? r.category === filter.category : true;
      const dateMatch = reminderDate === selectedDay;
      return petMatch && catMatch && dateMatch;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-4 bg-green-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-700">🌿 Daily Reminders</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          onClick={() => navigate('/reminder')}
        >
          ➕ Add Reminder
        </motion.button>
      </div>

      <CalendarStrip selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="mt-6 space-y-3">
        {filteredReminders.length === 0 ? (
          <p className="text-gray-500 text-center">No reminders found.</p>
        ) : (
          filteredReminders.map((reminder, index) => (
            <motion.div
              key={reminder._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border ${
                reminder.status === 'completed'
                  ? 'bg-green-100 border-green-300 opacity-70 line-through'
                  : 'bg-white border-green-200'
              }`}
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{reminder.title}</h2>
                <p className="text-sm text-gray-600">
                  🐾 {reminder.pet} | 📅 {new Date(reminder.date).toLocaleString()}
                </p>
                <p className="text-sm">{reminder.notes}</p>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                {reminder.status !== 'completed' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleComplete(reminder._id)}
                    className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-sm shadow"
                  >
                    ✅ Complete
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(reminder._id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm shadow"
                >
                  ✏️ Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(reminder._id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow"
                >
                  🗑️ Delete
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
