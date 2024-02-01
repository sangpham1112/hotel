import HeaderTitle from "@/app/(pages)/components/HeaderTitle";
import FormRegister from "./FormRegister";

const Register = () => {
  return (
    <main className="px-2 md:px-24 mt-5 max-w-[1280px]">
      <div className="h-full w-[500px] mx-auto shadow-xl p-4">
        <HeaderTitle>Register</HeaderTitle>
        <FormRegister />
      </div>
    </main>
  );
};

export default Register;
