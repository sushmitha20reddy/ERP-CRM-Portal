import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-100">

      <div className="hidden lg:flex bg-gradient-to-br from-blue-700 to-indigo-900 text-white items-center justify-center p-16">
        <div>
          <h1 className="text-3xl font-extrabold mb-6">
            ERP CRM Portal
          </h1>

          <p className="text-xl text-blue-100 leading-8">
            Manage Customers, Products,
            Inventory and Sales
            from one professional dashboard.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Login to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-slate-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-slate-500" />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;