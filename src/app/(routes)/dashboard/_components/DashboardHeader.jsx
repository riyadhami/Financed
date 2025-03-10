"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";

function DashboardHeader() {
    const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return(
        <div className="p-5 shadow-sm border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="flex flex-row items-center">
                    <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
                    <span className="text-blue-800 font-bold text-xl">Financed</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                    {user?.fullName || 'No user name'}
                </span>
                <div className="relative">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-10 w-10 border-2 border-blue-500",
                                userButtonPopoverCard: "py-2"
                            }
                        }}
                    />
                    {!isSignedIn && <span className="text-xs text-red-500">Not signed in</span>}
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;