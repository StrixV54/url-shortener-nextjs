import RegisterForm from "@/components/RegisterForm";

export default async function Register() {
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
      <RegisterForm />
    </main>
  );
}
