import AdminLayout from '@layouts/AdminLayout';
import AuthLayout from '@layouts/AuthLayout';
import UserLayout from '@layouts/UserLayout';
import AboutPage from '@pages/about/AboutPage';
import ContactPage from '@pages/contact/ContactPage';
import HomePage from '@pages/home/HomePage';
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* user routes */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="about" element={<AboutPage />}></Route>
          <Route path="contact" element={<ContactPage />}></Route>
        </Route>

        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* admin routes */}
        <Route element={<AdminLayout />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
