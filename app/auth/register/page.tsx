import Link from "next/link";

export default function Register() {
    return (
        <div className="grid grid-rows-5 border-solid border-4 w-96 h-120">
            <div className="flex justify-center items-end">
                <b className="text-4xl">Register</b>
            </div>

            <div className="flex justify-center items-center flex-col row-span-3 w-full h-full gap-3">
                <div className="flex justify-center flex-col">
                    <div>Username</div>
                    <input
                        type="text"
                        className="w-80 h-10 text-black border-solid border-2 pl-2"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div>Password</div>
                    <input
                        type="text"
                        className="w-80 h-10 text-black border-solid border-2 pl-2"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div>Confirm Password</div>
                    <input
                        type="text"
                        className="w-80 h-10 text-black border-solid border-2 pl-2"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                <button className="flex justify-center items-center text-white bg-black border-solid border-2 hover:bg-white duration-150 hover:text-black w-80 h-10">
                    Register
                </button>
                <Link href="/auth/login">
                    <button className="text-gray-600">Login?</button>
                </Link>
            </div>
        </div>
    );
}
