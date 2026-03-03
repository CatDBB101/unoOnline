import { db } from "@/utils/db";
import { NextRequest } from "next/server";
import { encode } from "jwt-simple";
import randomSecretKey from "@/utils/randomSecretKey";
import checkPasswordSecure from "@/utils/checkPasswordSecure";

export async function POST(request: NextRequest) {
    const bodyData = await request.json();

    const username = bodyData.username;
    const password = bodyData.password;

    const promisePool = db.promise();
    const [existUsername]: any = await promisePool.query(
        `SELECT * FROM Users WHERE \`username\` = "${username}";`,
    );

    if (existUsername.length > 0) {
        return new Response(null, {
            status: 409,
            statusText: "username already been use",
        });
    }

    const passwordSecureList = checkPasswordSecure(password);
    if (!passwordSecureList.isSecure) {
        return new Response(JSON.stringify(passwordSecureList), {
            status: 400,
            statusText: "password not secure",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const secret_key = randomSecretKey();

    const [result]: any = await promisePool.query(
        `INSERT INTO \`Users\` (username, password, secret_key) VALUES (?, ?, ?);`,
        [username, password, secret_key],
    );

    const jwt = encode(
        {
            sub: username,
        },
        secret_key,
    );

    return new Response(
        JSON.stringify({
            key: jwt,
            username: username,
        }),
        {
            headers: { "Content-Type": "application/json" },
        },
    );
}
