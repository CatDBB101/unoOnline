"use client";

import CreateLobbyWindow from "@/components/createLobbyWindow";
import { Earth, LogIn, Search } from "lucide-react";
import { useState } from "react";

export default function SearchLobby() {
    const [enableJoinButton, setEnableJoinButton] = useState<boolean>(true);
    const [hideCreateLobbyWindow, setHideCreateLobbyWindow] =
        useState<boolean>(true);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <CreateLobbyWindow
                isHide={hideCreateLobbyWindow}
                closeCallback={() => {
                    setHideCreateLobbyWindow(true);
                }}
            />

            <div className="flex flex-col gap-5 w-360 h-160 border-solid border-black border-4 p-4">
                <div className="grid grid-cols-6 gap-5 items-center p-5 w-full h-20 border-solid border-black border-2 text-3xl">
                    <div className="flex col-span-3">
                        <div>search&nbsp;lobby</div>
                        <input
                            type="text"
                            placeholder="enter lobby name"
                            className="w-full border-solid border-2 ml-2 pl-3"
                        />
                        <button className="flex justify-center items-center w-15 bg-black text-white">
                            <Search />
                        </button>
                    </div>

                    <div className="flex col-span-2">
                        <div>join&nbsp;lobby</div>
                        <input
                            type="text"
                            placeholder="enter lobby code"
                            className="w-full border-solid border-2 ml-2 pl-3"
                        />
                        <button className="flex justify-center items-center w-15 bg-black text-white">
                            <LogIn />
                        </button>
                    </div>

                    <div className="flex col-span-1">
                        <button
                            className="flex justify-center items-center w-full bg-black active:bg-white text-white active:text-black"
                            onClick={() => {
                                setHideCreateLobbyWindow(false);
                            }}
                        >
                            Create lobby
                        </button>
                    </div>
                </div>

                <div className="flex flex-col w-full h-full border-solid border-black border-2 text-3xl overflow-y-scroll">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((items, index) => {
                        return (
                            <div
                                className="flex flex-row items-center w-full h-20 p-3 border-solid border-b-2"
                                key={index}
                            >
                                <Earth size={35} />
                                <div className="ml-3">lobby name {index}</div>

                                <div className="ml-auto mr-3">5/10</div>
                                <button
                                    className={`px-5 ${enableJoinButton ? "bg-black" : "bg-gray-500"} text-white`}
                                >
                                    join
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
