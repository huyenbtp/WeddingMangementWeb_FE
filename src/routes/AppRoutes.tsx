import { Routes, Route } from "react-router-dom";
import Hall from "../pages/Hall/Hall"
import Party from "../pages/Party/Party";
import Schedule from "../pages/Schedule/Schedule";
import Food from "../pages/Food/Food";
import Service from "../pages/Service/Service";
import Report from "../pages/Report/Report";
import Settings from "../pages/Settings/Settings.tsx";
import Homepage from "../pages/Homepage/Homepage";
import BlankPage from "../pages/BlankPage/BlankPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/sanh-tiec" element={<Hall />} />
      <Route path="/tiec-cuoi" element={<Party />} />
      <Route path="/lich-su-kien/:view" element={<Schedule />} />
      <Route path="/mon-an" element={<Food />} />
      <Route path="/dich-vu" element={<Service />} />
      <Route path="/bao-cao" element={<Report />} />
      <Route path="/cai-dat" element={<Settings />} />
      <Route path="/blank-page" element={<BlankPage />} />
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}
