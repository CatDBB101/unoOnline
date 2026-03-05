import { X } from "lucide-react";
import { useState } from "react";

type CreateLobbyWindowProps = {
    isHide: boolean;
    closeCallback: () => void;
};

export default function CreateLobbyWindow({
    isHide,
    closeCallback,
}: CreateLobbyWindowProps) {
    const [lobbyName, setLobbyName] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [lobbySize, setLobbySize] = useState<number>(2);

    return (
        <div
            className={`flex justify-center items-center fixed w-full h-screen bg-black/60 ${isHide ? "hidden" : "block"}`}
        >
            <div className="flex flex-col bg-white w-280 h-150 border-solid border-4 border-black">
                <div className="relative flex justify-center items-center w-full h-20 border-solid border-b-4 border-black">
                    <div className="text-4xl font-bold">create lobby</div>

                    <button
                        className="absolute w-10 h-full right-4 flex items-center justify-center"
                        onClick={() => {
                            closeCallback();
                        }}
                    >
                        <X />
                    </button>
                </div>

                <div className="flex flex-col gap-3 w-full h-full p-4">
                    <div className="flex flex-col gap-2 w-full"> 
                        <div className="font-bold text-3xl">lobby name</div>
                        <input
                            type="text"
                            placeholder="enter lobby name"
                            className="w-full h-15 pl-3 text-2xl border-solid border-2"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="font-bold text-3xl">lobby type</div>
                        <div className="flex gap-4">
                            <button
                                className={`w-full h-15 border-solid border-2 border-black ${isPublic ? "bg-black text-white" : "bg-white text-shadow-black"} text-4xl`}
                                onClick={() => {
                                    setIsPublic(true);
                                }}
                            >
                                public
                            </button>

                            <button
                                className={`w-full h-15 border-solid border-2 border-black  ${!isPublic ? "bg-black text-white" : "bg-white text-shadow-black"} text-4xl`}
                                onClick={() => {
                                    setIsPublic(false);
                                }}
                            >
                                private
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="font-bold text-3xl">
                            lobby size (2 - 10 players)
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                min={2}
                                max={10}
                                defaultValue={2}
                                className="w-full h-15 pl-3 text-2xl border-solid border-2"
                                onChange={(event) => {
                                    setLobbySize(Number(event.target.value));
                                }}
                            />
                        </div>
                    </div>

                    <button className="w-full h-15 border-solid border-2 border-black bg-black text-white text-4xl mt-auto active:bg-white active:border-white active:text-black">
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
}
