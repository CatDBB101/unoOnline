import { db } from "@/utils/db";
import { NextRequest } from "next/server";
import { encode } from "jwt-simple";

export async function POST(request: NextRequest) {
    const bodyData = await request.json();

    const username = bodyData.username;
    const password = bodyData.password;

    const promisePool = db.promise();
    const [rows, fields]: any = await promisePool.query(
        `SELECT * FROM Users WHERE \`username\` = "${username}" AND \`password\` = "${password}";`,
    );

    if (rows.length == 0) {
        return new Response(null, {
            status: 404,
            statusText: "not found username or password",
        });
    }

    const jwt = encode(
        {
            sub: username,
        },
        rows[0].secret_key,
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