"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const requestLogin = async () => {
        const res = await fetch(
            `/api/auth/login?username=${username}&password=${password}`,
        );
        const result = await res.json();

        localStorage.setItem("key", result.key);
        localStorage.setItem("username", result.username);
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
                        className="w-80 h-10 text-black border-solid border-2 pl-2"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div>Password</div>
                    <input
                        type="text"
                        className="w-80 h-10 text-black border-solid border-2 pl-2"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                <button
                    className="flex justify-center items-center text-white bg-black border-solid border-2 hover:bg-white duration-150 hover:text-black w-80 h-10"
                    onClick={requestLogin}
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
