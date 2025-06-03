// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const fetchReminders = async () => {
//   const res = await fetch(BASE_URL);
//   return res.json();
// };

// export const createReminder = async (data) => {
//   const payload = { ...data, date: data.time };
//   delete payload.time;

//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   return res.json();
// };

// export const updateReminder = async (id, data) => {
//   const payload = { ...data, date: data.time };
//   delete payload.time;

//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   return res.json();
// };

// export const deleteReminder = async (id) => {
//   const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error('Delete failed:', errorText);
//     throw new Error('Delete failed');
//   }
//   return true;
// };


const BASE_URL = import.meta.env.VITE_BASE_URL;
const REMINDERS_ENDPOINT = `${BASE_URL}/api/reminders`;

export const fetchReminders = async () => {
  const res = await fetch(REMINDERS_ENDPOINT);
  if (!res.ok) throw new Error('Failed to fetch reminders');
  return res.json();
};

export const createReminder = async (data) => {
  const payload = { ...data, date: data.time };
  delete payload.time;

  const res = await fetch(REMINDERS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to create reminder');
  return res.json();
};

export const updateReminder = async (id, data) => {
  const payload = { ...data, date: data.time };
  delete payload.time;

  const res = await fetch(`${REMINDERS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to update reminder');
  return res.json();
};

export const deleteReminder = async (id) => {
  const res = await fetch(`${REMINDERS_ENDPOINT}/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Delete failed:', errorText);
    throw new Error('Delete failed');
  }

  return true;
};
