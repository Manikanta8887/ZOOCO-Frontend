import { motion } from 'framer-motion';

export default function ReminderCard({ reminder, onComplete, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg shadow-md ${
        reminder.status === 'completed' ? 'bg-green-100' : 'bg-white'
      } border border-green-300`}
    >
      <h3 className="text-lg font-bold text-green-800">{reminder.title}</h3>
      <p className="text-sm text-gray-600">{reminder.notes}</p>
      <div className="flex justify-between mt-2">
        <button
          className="text-sm text-white bg-green-500 px-3 py-1 rounded"
          onClick={() => onComplete(reminder._id)}
        >
          ✅ Complete
        </button>
        <button
          className="text-sm text-white bg-red-500 px-3 py-1 rounded"
          onClick={() => onDelete(reminder._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </motion.div>
  );
}
