"use client";

import SubmitBtn from "./SubmitBtn";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const submitData = async (event) => {
    event.preventDefault();
    try {
      const formdata = new FormData(event.target);
      // console.log(formdata);
      await signIn("credentials", {
        email: formdata.get("email"),
        password: formdata.get("password"),
        redirect: false,
      });
      toast.success("Successfully Login");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <form
      // action={formAction}
      onSubmit={submitData}
    >
      <div className="card bg-base-200 w-80">
        <div className="card-body gap-6">
          <div className="w-full text-center text-2xl font-medium">Login</div>
          <input required placeholder="Email" name="email" type="email" className="input input-bordered" />
          <input required placeholder="Password" name="password" type="password" className="input input-bordered" />
          <SubmitBtn label={"Sign In"} />
          <Link href={"/register"} className="badge badge-primary">
            Create new account!
          </Link>
        </div>
      </div>
    </form>
  );
}
