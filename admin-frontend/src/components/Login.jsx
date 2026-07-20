import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LockKeyhole, LogIn } from "lucide-react";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("admin@renewcred.local");
  const [password, setPassword] = useState("ChangeMe123!");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <main className="min-h-screen bg-shell px-4 py-10 text-ink">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <div>
          <div className="mb-8 inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold shadow-sm">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-brand" />
            RenewCred CMS
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-normal">
            Structured standards content, decoupled from the public frontend.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Manage long-form policy pages as reusable blocks, publish them through the API, and let the Next.js site render the same content dynamically.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-8 shadow-panel">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-white">
            <LockKeyhole size={22} />
          </div>
          <h2 className="text-2xl font-semibold">Admin login</h2>
          <p className="mt-2 text-sm text-muted">Use the seeded credentials or the values from your environment.</p>

          <label className="mt-8 block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-white px-4 py-3 outline-none transition focus:border-brand"
          />

          <label className="mt-5 block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-white px-4 py-3 outline-none transition focus:border-brand"
          />

          {error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "loading"}
          >
            <LogIn size={18} />
            {status === "loading" ? "Signing in" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
