"use client";

import React from "react";
import GoogleProvider from "../google-provider";
import EmailProvider from "./email-provider";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="border shadow-lg p-14 rounded-lg">
        <Image
          src={"/assets/images/logo-text.svg"}
          alt="logo"
          width={130}
          height={50}
          className="mb-5"
        />
        <h4 className="font-semibold">Create your account</h4>
        <p className="text-sm text-slate-500 mb-5">to continue to Chat GPT</p>
        <GoogleProvider />
        <div className="flex items-center my-5">
          <hr className="w-full" />
          <p className="px-4 text-sm">or</p>
          <hr className="w-full" />
        </div>
        <EmailProvider />
      </div>
    </main>
  );
}
