"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [errorMessage, setErrorMessage] = useState<String>("");

    const handleLogin = async () => {
        if (username.length == 0 || password.length == 0) {
            setErrorMessage("please enter username and password");
            return;
        }

        const res = await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!res.ok) {
            if (res.status == 404) {
                setErrorMessage("username or password error");
            }
            return;
        }

        const result = await res.json();

        localStorage.setItem("key", result.key);
        localStorage.setItem("username", result.username);

        router.push("/");
    };

    return (
        <div className="grid grid-rows-4 border-solid border-4 w-96 h-120">
            <div className="flex justify-center items-end">
                <b className="text-4xl">Login</b>
            </div>

            <div className="flex justify-center items-center flex-col row-span-2 w-full h-full gap-3">
                <div className="flex justify-center flex-col">
                    <div>Username</div>
                    <input
                        type="text"
                        className={`w-80 h-10 text-black border-solid border-2 pl-2 ${errorMessage.length == 0 ? "border-black" : "border-red-500"}`}
                        onChange={(event) => {
                            setErrorMessage("");
                            setUsername(event.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div>Password</div>
                    <input
                        type="text"
                        className={`w-80 h-10 text-black border-solid border-2 pl-2 ${errorMessage.length == 0 ? "border-black" : "border-red-500"}`}
                        onChange={(event) => {
                            setErrorMessage("");
                            setPassword(event.target.value);
                        }}
                    />
                    <div
                        className={`text-red-500 ${errorMessage.length == 0 ? "hidden" : "flex"}`}
                    >
                        {errorMessage}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                <button
                    className="flex justify-center items-center text-white bg-black border-solid border-2 hover:bg-white duration-150 hover:text-black w-80 h-10"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <Link href="/auth/register">
                    <button className="text-gray-600">Register?</button>
                </Link>
            </div>
        </div>
    );
}
