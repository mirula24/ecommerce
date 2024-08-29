import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // npm i @hookform/resolvers
import * as z from "zod";
import Images from "../assets/images/index";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    login(data.username, data.password);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-background-gray">
      <PageTitle title="Login" />
      {/** Container for Logo and Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-[120px] w-auto"
          src={Images.enigmaGrowLogo}
          alt="Enigma Company Logo"
        />
        <h2 className="text-2xl mt-4 text-center font-bold leading-9 tracking-tight text-gray-900">
          Dashboard Admin Login
        </h2>
      </div>

      {/** Container for Login Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/** Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  {...register("username")}
                  type="text"
                  placeholder="username"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                {errors.username?.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username?.message}
                  </p>
                )}
              </div>
            </div>

            {/** Password Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                {errors.password?.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>

            {/** Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full justify-between rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-darker"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
