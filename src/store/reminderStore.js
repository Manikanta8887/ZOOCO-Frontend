import { create } from 'zustand';

const useReminderStore = create((set) => ({
  reminders: [],
  setReminders: (data) => set({ reminders: data })
}));

export default useReminderStore;
