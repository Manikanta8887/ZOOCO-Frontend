import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CalendarStrip({ selectedDate, onDateChange }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    const week = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - today.getDay() + i);
      return {
        date: d,
        label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      };
    });
    setDays(week);
  }, []);

  return (
    <motion.div
      className="flex gap-2 overflow-x-auto py-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {days.map((day, index) => {
        const isSelected = day.date.toDateString() === selectedDate.toDateString();
        return (
          <button
            key={index}
            className={`px-4 py-2 rounded-full font-medium shadow-sm transition-colors ${
              isSelected
                ? 'bg-green-500 text-white'
                : 'bg-green-100 hover:bg-green-200 text-green-800'
            }`}
            onClick={() => onDateChange(day.date)}
          >
            {day.label}
          </button>
        );
      })}
    </motion.div>
  );
}
