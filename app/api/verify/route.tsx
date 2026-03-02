import { db } from "@/utils/db";
import { decode } from "jwt-simple";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const paramKey = searchParams.get("key");
    const paramUsername = searchParams.get("username");

    const promisePool = db.promise();
    const [rows, fields]: any = await promisePool.query(
        `SELECT * FROM Users WHERE \`username\` = "${paramUsername}";`,
    );

    if (rows.length == 0) {
        return Response.json(null, { status: 404 });
    }

    const decoded_jwt = decode(paramKey!, rows[0].secret_key);

    return Response.json(decoded_jwt);
}
