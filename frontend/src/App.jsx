import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UrlShortener from "./pages/UrlShortener";
import SmsTemplates from "./pages/SmsTemplates";
import SendSms from "./pages/SendSms";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UrlShortener />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <SmsTemplates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/send-sms"
          element={
            <ProtectedRoute>
              <SendSms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
