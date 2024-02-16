"use client";

import { loginFormSubmit } from "@/actions/server";
import { useFormState } from "react-dom";
import SubmitBtn from "./SubmitBtn";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginFormSubmit, { message: "" });
  const router = useRouter();

  useEffect(() => {
    if (state?.message === "true") {
      signIn("credentials", {
        email: state?.email,
        password: state?.password,
        redirect: false,
      })
        .then(() => router.push("/dashboard"))
        .catch((error) => toast.error(error?.message));
    } 
    else if (state?.message) toast.error(state?.message);
  }, [state?.message]);

  return (
    <form action={formAction}>
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
