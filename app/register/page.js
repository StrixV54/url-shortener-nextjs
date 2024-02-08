"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/register",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw response;
      }
      const result = await response.json();

      localStorage.setItem(
        "shortener-user",
        JSON.stringify({ ...formData, userId: result?.userId })
      );

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error === "Invalid password" || res?.error === "Invalid user") {
        toast.error(res?.error);
        console.log("Error", res?.error);
      } else {
        setIsLogged(true);
      }
    } catch (error) {
      toast.error(error?.statusText);
      console.log("signIn had an error", error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1400);
    }
  }, [isLogged]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-base-300 gap-10 relative">
      <h1 className="text-[#5a67ff] sm:text-7xl text-4xl font-bold flex">
        URL Shortener
        <img
          loading="lazy"
          width="72"
          height="72"
          alt="sunglasses emoji"
          src="	https://daisyui.com/images/emoji/smiling-face-with-sunglasses.webp"
          className="ml-2 pointer-events-none inline-block h-[1em] w-[1em] align-bottom"
        />
      </h1>
      <form onSubmit={onSubmit}>
        <div className="card bg-base-200 w-80">
          <div className="card-body gap-6">
            <div className="w-full text-center text-2xl font-medium">
              Register
            </div>
            <input
              placeholder="Name"
              name="name"
              type="text"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              placeholder="Email"
              name="email"
              type="email"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              type="submit"
              className="btn btn-primary mb-3 text-white bg-[#4a58f1] border-none"
            >
              Sign Up
            </button>
            <Link href={"/login"} className="badge badge-primary">
              Already have account?
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
