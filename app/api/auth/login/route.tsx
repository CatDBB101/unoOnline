import { db } from "@/utils/db";
import { NextRequest } from "next/server";
import { encode } from "jwt-simple";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const paramUsername = searchParams.get("username");
    const paramPassword = searchParams.get("password");

    const promisePool = db.promise();
    const [rows, fields]: any = await promisePool.query(
        `SELECT * FROM Users WHERE \`username\` = "${paramUsername}" AND \`password\` = "${paramPassword}";`,
    );

    if (rows.length == 0) {
        return new Response(null, {
            status: 404,
            statusText: "Not found username or password",
        });
    }

    const jwt = encode(
        {
            sub: paramUsername,
        },
        rows[0].secret_key,
    );

    return new Response(
        JSON.stringify({
            key: jwt,
            username: paramUsername,
        }),
        {
            headers: { "Content-Type": "application/json" },
        },
    );
}
