import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { fetchMe } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch, token]);

  return token ? <Dashboard /> : <Login />;
}
