import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect, useState } from "react";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login(userData)) : dispatch(logout());
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-sc flex flex-wrap">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
