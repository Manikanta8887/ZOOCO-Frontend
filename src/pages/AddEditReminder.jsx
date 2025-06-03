// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import ReminderForm from '../components/ReminderForm';
// import { createReminder, updateReminder } from '../services/reminderService';
// import useReminderStore from '../store/reminderStore';

// export default function AddEditReminder() {
//   const { id } = useParams();
//   const { reminders, setReminders } = useReminderStore();
//   const navigate = useNavigate();
//   const [initialData, setInitialData] = useState(null);

//   useEffect(() => {
//     if (id) {
//       const reminder = reminders.find(r => r._id === id);
//       setInitialData(reminder);
//     }
//   }, [id, reminders]);

//   const handleSubmit = async (data) => {
//     try {
//       if (id) {
//         const res = await updateReminder(id, data);
//         setReminders(reminders.map(r => r._id === id ? res : r));
//       } else {
//         const res = await createReminder(data);
//         setReminders([...reminders, res]);
//       }
//       navigate('/');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-4">{id ? 'Edit' : 'Add'} Reminder</h2>
//       <ReminderForm onSubmit={handleSubmit} initialData={initialData} />
//     </div>
//   );
// }


import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReminderForm from '../components/ReminderForm';
import { createReminder, updateReminder } from '../services/reminderService';
import useReminderStore from '../store/reminderStore';

export default function AddEditReminder() {
  const { id } = useParams();
  const { reminders, setReminders } = useReminderStore();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id && reminders.length) {
      const reminder = reminders.find((r) => r._id === id);
      if (reminder) {
        setInitialData(reminder);
      } else {
        console.warn('Reminder not found for id:', id);
      }
    }
  }, [id, reminders]);

  const handleSubmit = async (data) => {
    try {
      if (id) {
        const res = await updateReminder(id, data);
        setReminders(reminders.map((r) => (r._id === id ? res : r)));
      } else {
        const res = await createReminder(data);
        setReminders([...reminders, res]);
      }
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  if (id && !initialData) {
    return <p className="text-gray-500">Loading reminder data...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{id ? 'Edit' : 'Add'} Reminder</h2>
      <ReminderForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
}
