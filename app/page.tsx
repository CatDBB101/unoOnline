"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Root() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const isLogin = !(localStorage.getItem("key") === null);
        if (!isLogin) {
            router.push("/auth/login");
            return;
        }
        setIsLogin(true);
    }, []);

    if (isLogin) {
        return (
            <div className="flex flex-col justify-center items-center gap-6 w-full h-screen">
                <div className="text-7xl font-bold mb-10">UNO ONLINE</div>

                <button className="w-100 text-3xl border-solid border-4 border-black px-5 py-2 active:bg-black active:text-white"
                onClick={() => {
                    router.push("/searchLobby");
                }}>
                    PLAY
                </button>

                <button className="w-100 text-3xl border-solid border-4 border-black px-5 py-2 active:bg-black active:text-white">
                    PROFILE
                </button>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center w-full h-screen text-8xl font-bold">
                UNO ONLINE
            </div>
        );
    }
}
