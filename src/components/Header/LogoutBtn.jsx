import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-blue-100 transition-colors duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
