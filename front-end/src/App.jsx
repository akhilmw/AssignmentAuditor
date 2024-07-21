import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CodeReviewerDashboard from "./components/CodeReviewerDashboard";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AssignmentView from "./components/AssignmentView";
import CodeReviewerAssignmentView from "./components/CodeReviewerAssignmentView";
import AuthGuard from "./HOC/Auth";
import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useJwt } from "./components/UserProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const DashBoardWithGuard = AuthGuard(Dashboard);
  const CodeReviewerDashboardWithGuard = AuthGuard(CodeReviewerDashboard);
  const AssignmentViewWithGuard = AuthGuard(AssignmentView);
  const CodeReviewerAssignmentViewWithGuard = AuthGuard(
    CodeReviewerAssignmentView
  );

  const {jwtToken, setJwtToken} = useJwt();

  const [roles, setRoles] = useState([]);


  useEffect(() => {
    const getRolesFromJwt = (token) => {
      const decoded = jwtDecode(token);
      const user_role = decoded.authorities;
      setRoles(user_role);
    };
    if (jwtToken) {
      getRolesFromJwt(jwtToken);
    }
  }, [jwtToken]);

  return (
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <Header />
          <main className="flex-grow">
            <Routes>
              {roles.includes("ROLE_CODE_REVIEWER") ? (
                <Route
                  path="/dashboard"
                  exact
                  element={<CodeReviewerDashboardWithGuard />}
                />
              ) : (
                <Route
                  path="/dashboard"
                  exact
                  element={<DashBoardWithGuard />}
                />
              )}
              {roles.includes("ROLE_CODE_REVIEWER") ? (
                <Route
                  path="/assignments/:id"
                  exact
                  element={<CodeReviewerAssignmentViewWithGuard />}
                />
              ) : (
                <Route
                  path="/assignments/:id"
                  exact
                  element={<AssignmentViewWithGuard />}
                />
              )}
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/" exact element={<Homepage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer/>
        </BrowserRouter>
      </div>
  );
};

export default App;
