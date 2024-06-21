import { SyntheticEvent, useState } from "react"
import { Link } from "react-router-dom"
import Input from "../../components/input";
import useLogin from "../../hooks/auth/useLogin";
import { useAuthContext } from "../../context/auth-context";

const login = () => {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useLogin();
  const { setAuthUser } = useAuthContext();

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const data = await login({ user_name, password });

    if (data?.id) {
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
    }
  }

  return (
    <div className="p-2 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h2 className="text=3x1 font-semibold text-center text-gray-300">
            Login
            <span className="text-b1 ml-2 text-sky-500">Chat App</span>
          </h2>

          <form onSubmit={onSubmit}>
            <Input
              value={user_name}
              onChange={value => setUsername(value)}
              label="Username"
              placeholder="Username"
            />
            <Input
              value={password}
              onChange={value => setPassword(value)}
              label="Password"
              placeholder="Password"
              type="password"
            />
            <div className="text-right">
              <Link to="/sign-up" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Don't have an account?</Link>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary w-full text-white" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login;