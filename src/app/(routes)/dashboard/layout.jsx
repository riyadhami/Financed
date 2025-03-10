"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../utils/dbConfig";
import { Budgets } from "../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function DashboardLayout({children}) {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/sign-in");
            return;
        }
        if (user) {
            checkUserBudgets();
        }
    }, [user, isLoaded, isSignedIn]);

    const checkUserBudgets = async() => {
        try {
            const result = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
            console.log("User budgets:", result);
            if (result?.length == 0 && router.pathname !== "/dashboard/budgets") {
                router.replace("/dashboard/budgets");
            }
        } catch (error) {
            console.error("Error checking budgets:", error);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return null;
    }

    return (
        <div>
            <div className="fixed md:w-64 hidden md:block">
                <SideNav />
            </div>
            <div className="md:ml-64">
                <DashboardHeader />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
