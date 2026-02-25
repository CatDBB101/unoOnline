import Image from "next/image";

export default function Login() {
    return (
        <div className="grid grid-rows-4 border-solid border-4 w-96 h-96">
            <div className="flex justify-center items-center">
                <b className="text-4xl">Login</b>
            </div>

            <div className="flex justify-center items-center flex-col row-span-2 w-full h-full px-10">
                <input
                    type="text"
                    className="w-full h-10 text-black border-solid border-4"
                />
                <input
                    type="text"
                    className="w-full h-10 text-black border-solid border-4"
                />
            </div>

            <div></div>
        </div>
    );
}
