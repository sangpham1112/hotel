import HeaderTitle from "@/app/(pages)/components/HeaderTitle";
import FormLogin from "./FormLogin";

const Login = () => {
  return (
    <main className="px-2 md:px-24 mt-5 max-w-[1280px]">
      <div className="h-full w-[500px] mx-auto shadow-xl p-4">
        <HeaderTitle>Login</HeaderTitle>
        <FormLogin />
      </div>
    </main>
  );
};

export default Login;
