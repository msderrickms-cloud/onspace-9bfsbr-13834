import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Landing from '@/pages/Landing';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin-dashboard" element={<Admin />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
