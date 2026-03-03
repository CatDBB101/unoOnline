"use client";
import checkPasswordSecure, {
    PasswordScore,
    passwordSecureRuleLabel,
} from "@/utils/checkPasswordSecure";
import { CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Register() {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [confirmPassword, setConfirmPassword] = useState<String>("");

    const [errorMessage, setErrorMessage] = useState<String>("");
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [isPasswordInputError, setIsPasswordInputError] =
        useState<boolean>(false);
    const [passwordSecureList, setPasswordSecureList] = useState<PasswordScore>(
        {
            length: false,
            hasNum: false,
            hasUpper: false,
            hasLower: false,
            isSecure: false,
        },
    );

    useEffect(() => {
        let _passwordSecureList = checkPasswordSecure(password.toString());
        setPasswordSecureList(_passwordSecureList);
    }, [password]);

    const requestRegister = async () => {
        if (
            username.length == 0 ||
            password.length == 0 ||
            confirmPassword.length == 0
        ) {
            setIsInputError(true);
            return;
        }

        if (password != confirmPassword) {
            setIsPasswordInputError(true);
            return;
        }

        const _passwordSecureList = checkPasswordSecure(password.toString());
        if (!_passwordSecureList.isSecure) {
            setIsPasswordInputError(true);
            return;
        }

        const res = await fetch(`/api/auth/register`, {
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
            setErrorMessage(res.statusText);
            return;
        }

        const result = await res.json();

        localStorage.setItem("key", result.key);
        localStorage.setItem("username", result.username);
    };

    return (
        <div className="grid grid-rows-5 border-solid border-4 w-96 h-160">
            <div className="flex justify-center items-end">
                <b className="text-4xl">Register</b>
            </div>

            <div className="flex justify-center items-center flex-col row-span-3 w-full h-full gap-3">
                <div className="flex justify-center flex-col">
                    <div>Username</div>
                    <input
                        type="text"
                        className={`w-80 h-10 text-black border-solid border-2 pl-2 ${isInputError || errorMessage.length > 0 ? "border-red-500" : "border-black"}`}
                        onChange={(event) => {
                            setIsInputError(false);
                            setErrorMessage("");
                            setUsername(event.target.value);
                        }}
                    />
                    <div
                        className={`text-red-500 ${errorMessage.length == 0 ? "hidden" : "flex"}`}
                    >
                        {errorMessage}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <div>Password</div>
                    <input
                        type="text"
                        className={`w-80 h-10 text-black border-solid border-2 pl-2 ${isInputError || isPasswordInputError ? "border-red-500" : "border-black"}`}
                        onChange={(event) => {
                            setIsInputError(false);
                            setIsPasswordInputError(false);
                            setPassword(event.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div>Confirm Password</div>
                    <input
                        type="text"
                        className={`w-80 h-10 text-black border-solid border-2 pl-2 ${isInputError || isPasswordInputError ? "border-red-500" : "border-black"}`}
                        onChange={(event) => {
                            setIsInputError(false);
                            setIsPasswordInputError(false);
                            setConfirmPassword(event.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col gap-1 w-80">
                    {Object.keys(passwordSecureList).map(
                        (ruleKey: any, index: number) => {
                            const isRulePass =
                                passwordSecureList[
                                    ruleKey as keyof typeof passwordSecureRuleLabel
                                ];
                            if (ruleKey == "isSecure") return;
                            return (
                                <div className="flex gap-2" key={index}>
                                    {isRulePass ? (
                                        <CircleCheck className="text-green-500" />
                                    ) : (
                                        <CircleX className="text-red-500" />
                                    )}

                                    <div
                                        className={`text-sm ${isRulePass ? "text-green-500" : "text-red-500"}`}
                                    >
                                        {
                                            passwordSecureRuleLabel[
                                                ruleKey as keyof typeof passwordSecureRuleLabel
                                            ]
                                        }
                                    </div>
                                </div>
                            );
                        },
                    )}
                    {/* <div className="flex gap-2">
                        <CircleCheck className="" />
                        <div className="text-sm">
                            length more than or equal 12
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <CircleCheck className="" />
                        <div className="text-sm">has number</div>
                    </div>
                    <div className="flex gap-2">
                        <CircleCheck className="" />
                        <div className="text-sm">has lowercase alphabet</div>
                    </div>
                    <div className="flex gap-2">
                        <CircleCheck className="" />
                        <div className="text-sm">has uppercase alphabet</div>
                    </div> */}
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                <button
                    className="flex justify-center items-center text-white bg-black border-solid border-2 hover:bg-white duration-150 hover:text-black w-80 h-10"
                    onClick={requestRegister}
                >
                    Register
                </button>
                <Link href="/auth/login">
                    <button className="text-gray-600">Login?</button>
                </Link>
            </div>
        </div>
    );
}
