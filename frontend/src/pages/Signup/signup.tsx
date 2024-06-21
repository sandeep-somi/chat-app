import { Link } from "react-router-dom";
import Input from "../../components/input";
import { SyntheticEvent, useState } from "react";
import useSignup from "../../hooks/auth/useSignup";
import { useAuthContext } from "../../context/auth-context";

const Signup = () => {
  const [full_name, setFullName] = useState('');
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const { loading, signup } = useSignup();
  const { setAuthUser } = useAuthContext();

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const data = await signup({
      full_name,
      user_name,
      password,
      confirm_password,
      gender,
    });

    if(data?.id) {
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
    }
  }

  return (
    <div className="p-2 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h2 className="text=3x1 font-semibold text-center text-gray-300">
            Sign Up
            <span className="text-b1 ml-2 text-sky-500">Chat App</span>
          </h2>

          <form onSubmit={onSubmit}>
            <Input
              value={full_name}
              onChange={(value) => setFullName(value)}
              label="Full Name"
              placeholder="Full Name"
            />
            <Input
              value={user_name}
              onChange={(value) => setUsername(value)}
              label="Username"
              placeholder="Username"
            />
            <Input
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
              label="Password"
              placeholder="Password"
            />
            <Input
              type="password"
              value={confirm_password}
              onChange={(value) => setConfirmPassword(value)}
              label="Confirm Password"
              placeholder="Confirm Password"
            />

            <div className="mt-2">
              <div className="flex">
                <div className="form-control">
                  <label className="label gap-2 hover:cursor-pointer">
                    <span className="label-text">Male</span>
                    <input
                      type="checkbox"
                      className="checkbox border-slate-900"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                  </label>
                </div>
                <div className="form-control ml-4">
                  <label className="label gap-2 hover:cursor-pointer">
                    <span className="label-text">Female</span>
                    <input
                      type="checkbox"
                      className="checkbox border-slate-900"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="text-right">
              <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?</Link>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary w-full text-white" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup