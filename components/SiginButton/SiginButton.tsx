"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { LogOutUser } from "@/lib/features/authSlice";
function SiginButton() {
  const { data: session } = useSession();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(LogOutUser());
  };

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <img
          src={session.user.image || "/default-profile.png"}
          alt="Image User Google"
          className="size-7 rounded-full"
        />
        <button onClick={() => signOut()} className="text-white font-semibold">
          Sign Out
        </button>
      </div>
    );
  } else if (auth.name) {
    return (
      <div className="flex gap-4 ml-auto">
        <Link href="/admin">
          <button className="text-white font-semibold">Admin</button>
        </Link>
        <p className="text-white">{auth.name}</p>
        <button onClick={handleSignOut} className="text-white font-semibold">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <Link href="/login">
      <button className="text-white ml-auto">Sign In</button>
    </Link>
  );
}

export default SiginButton;
