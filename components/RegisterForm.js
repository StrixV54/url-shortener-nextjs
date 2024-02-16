"use client";

import { registerFormSubmit } from "@/actions/server";
import { useFormState } from "react-dom";
import SubmitBtn from "./SubmitBtn";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [state, formAction] = useFormState(registerFormSubmit, { message: "" });

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
          <div className="w-full text-center text-2xl font-medium">Register</div>
          <input placeholder="Name" name="name" type="text" className="input input-bordered" />
          <input placeholder="Email" name="email" type="email" className="input input-bordered" />
          <input placeholder="Password" name="password" type="password" className="input input-bordered" />
          <SubmitBtn label="Sign Up" />
          <Link href={"/login"} className="badge badge-primary">
            Already have account?
          </Link>
        </div>
      </div>
    </form>
  );
}
