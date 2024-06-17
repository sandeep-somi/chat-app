import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/auth-context";

function App() {
  const { auth_user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={auth_user ? <Home /> : <Navigate to='/login' />} />
        <Route path="/login" element={auth_user ? <Navigate to='/' /> : <Login />} />
        <Route path="/sign-up" element={auth_user ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
