import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import AdminPage from "./pages/admin";
import StudentHomePage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";


function App() {
  const {auth} = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/auth" element={<RouteGuard element={<AuthPage />} authenticated={auth?.authenticated} user={auth?.user} />} />
      <Route path="/admin" element={<RouteGuard element={<AdminPage />} authenticated={auth?.authenticated} user={auth?.user} />} />
      <Route path="/" element={<RouteGuard element={<StudentViewCommonLayout />} authenticated={auth?.authenticated} user={auth?.user} />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<StudentHomePage />} />
      </Route>
    </Routes>
  );

}

export default App
