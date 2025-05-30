import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEditReminder from './pages/AddEditReminder';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reminder/:id?" element={<AddEditReminder />} />
    </Routes>
  );
}
