"use client";
import React, { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/features/authSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state: any) => state.auth);
  const { data: session } = useSession();
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  if (session && session.user) {
    router.push("/");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const email = userRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      const user = {
        email,
        password,
      };
      dispatch(loginUser(user));
    } else {
      console.error("Email and password must be provided");
    }
  };
  useEffect(() => {
    if (auth.name) {
      router.push("/");
    }
  }, [auth.name, router]);
  return (
    <>
      {!(session && session.user) && (
        <div className="max-w-[400px] mx-auto border min-h-[500px] p-4 flex flex-col justify-evenly rounded-md">
          <p className="text-3xl font-semibold">
            Chào mừng bạn đến với online shopping!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <p>Đăng nhập bằng tài khoản</p>
            <label htmlFor="email">
              <p>User Name</p>
              <input
                ref={userRef}
                type="text"
                name="email"
                className="border w-full rounded-md p-1"
              />
            </label>
            <label htmlFor="username">
              <p>Pass Word</p>
              <input
                ref={passwordRef}
                type="password"
                name="username"
                className="border w-full rounded-md p-1"
              />
            </label>
            <button type="submit" className="rounded-md bg-sky-600 py-2">
              Đăng nhập
            </button>
          </form>
          <p>
            Bạn có tài khoản chưa?{" "}
            <Link href="/register" className="font-thin text-sky-500">
              Đăng ký
            </Link>
          </p>
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
            className="text-white rounded-md bg-red-500 py-2"
          >
            Sign In With Google
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
