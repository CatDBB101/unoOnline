import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "UNO Online",
    description: "Login/Register",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex justify-center items-center w-screen min-h-screen">
            {children}
        </div>
    );
}
