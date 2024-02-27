"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";
import { PiSignOutLight, PiGearSixLight, PiUserLight } from "react-icons/pi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { getUserDetails, signOut } from "@/lib/helper-functions";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { replace } = useRouter();
  const [user, setUser] = React.useState({
    id: "",
    name: "",
    email: "",
    picture: "",
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getUserDetails().then((user) => setUser(user));
    setLoading(false);
  }, []);

  return (
    <nav className="h-11 w-full flex justify-center">
      <div className="border-b flex justify-between items-center px-5 max-w-5xl w-full">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={150}
          height={50}
        />
        <div className="flex items-center gap-x-2">
          <ThemeSwitcher />
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <Popover>
              <PopoverTrigger asChild>
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt=""
                    height={40}
                    width={40}
                    sizes="100vw"
                    className="rounded-full border p-0.5 cursor-pointer"
                  />
                ) : (
                  <div>
                    <PiUserLight className="border h-10 w-10 p-2.5 rounded-full cursor-pointer" />
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-2 mb-2">
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt=""
                        height={40}
                        width={40}
                        sizes="100vw"
                        className="rounded-full border p-0.5"
                      />
                    ) : (
                      <PiUserLight className="border h-10 w-10 p-2.5 rounded-full cursor-pointer" />
                    )}

                    <div>
                      <h4 className="text-sm font-semibold">{user.name}</h4>
                      <p className="text-xs">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="flex justify-start items-center gap-x-5"
                  >
                    <PiGearSixLight className="text-slate-600 dark:text-white" />
                    <p className="text-xs">Manage account</p>
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="flex justify-start items-center gap-x-5"
                    onClick={async () => {
                      const res = await signOut();
                      if (res) replace("/auth/sign-in");
                    }}
                  >
                    <PiSignOutLight className="text-slate-600 dark:text-white" />
                    <p className="text-xs">Sign out</p>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
