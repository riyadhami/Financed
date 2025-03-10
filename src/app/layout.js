import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Financed",
  description: "Your personal Financial Advisor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <body className={outfit.className}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}