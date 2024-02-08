"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState({
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
        process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
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
        JSON.stringify({ ...result?.user })
      );

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error === "Invalid password" || res?.error === "Invalid user") {
        toast.error(res?.error);
        console.log("Error: ", res?.error);
      } else {
        toast.success("Logging in...");
        setIsLogged(true);
      }
    } catch (error) {
      toast.error(error?.status === 400 ? "Wrong Credentials" : "Bad Request");
      console.log("signIn had an error: ", error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      router.push("/dashboard");
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
            <div className="w-full text-center text-2xl font-medium">Login</div>
            <input
              required
              placeholder="Email"
              name="email"
              type="email"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              required
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
              Sign In
            </button>
            <Link href={"/register"} className="badge badge-primary">
              Create new account!
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
