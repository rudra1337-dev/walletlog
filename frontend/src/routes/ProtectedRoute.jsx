import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchMe } from "../features/authSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user, status } = useSelector((s) => s.auth);

  useEffect(() => {
    if (status === "idle") dispatch(fetchMe());
  }, [status, dispatch]);

  if (status === "idle" || status === "loading") return <div className="text-center mt-5">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}