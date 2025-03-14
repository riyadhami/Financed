"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn, isLoaded } = useUser();

  // Don't render anything until the auth is loaded
  if (!isLoaded) {
    return null;
  }

  return (
      <div className="p-5 flex justify-between items-center border shadow-sm">
        <div className="flex flex-row items-center">
          <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
          <span className="text-blue-800 font-bold text-xl">Financed</span>
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full">
                Go to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {user?.fullName}
              </span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard: "py-2"
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>
              <Button variant="outline" className="rounded-full">Dashboard</Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        )}
    </div>
  );
}

export default Header;