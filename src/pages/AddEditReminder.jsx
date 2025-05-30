import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReminderForm from '../components/ReminderForm';
import { fetchReminders, createReminder, updateReminder } from '../services/reminderService';
import useReminderStore from '../store/reminderStore';

export default function AddEditReminder() {
  const { id } = useParams();
  const { reminders, setReminders } = useReminderStore();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      const reminder = reminders.find(r => r._id === id);
      setInitialData(reminder);
    }
  }, [id, reminders]);

  const handleSubmit = async (data) => {
    if (id) {
      const res = await updateReminder(id, data);
      setReminders(reminders.map(r => r._id === id ? res.data : r));
    } else {
      const res = await createReminder(data);
      setReminders([...reminders, res.data]);
    }
    navigate('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{id ? 'Edit' : 'Add'} Reminder</h2>
      <ReminderForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
}
