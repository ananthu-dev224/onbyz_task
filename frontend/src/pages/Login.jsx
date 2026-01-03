import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import api from "../api/api";
import { loginUser } from "../services/authService";


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character"
    ),
});


export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (data) => {
    try {
      const { token } = await loginUser(data);

      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
