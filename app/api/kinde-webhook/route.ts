import "dotenv/config";
import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { init, Users } from "@kinde/management-api-js";
import { InferInsertModel } from "drizzle-orm";
import { users } from "@/db/schema";
import db from "@/db";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL!}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    const token = await req.text();

    const { header } = jwt.decode(token, { complete: true }) as Jwt;
    const { kid } = header;

    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as JwtPayload;

    switch (event?.type) {
      case "user.updated":
        console.log(event.data);
        break;
      case "user.created":
        init();
        const { user } = event.data;
        const { id } = user;

        const { first_name, last_name, preferred_email, picture, username } =
          await Users.getUserData({ id });

        const newUser: InferInsertModel<typeof users> = {
          email: preferred_email || "test@test.com",
          firstName: first_name || "test",
          lastName: last_name || "test",
          username: username || preferred_email || "test",
          kindeId: id,
          picture,
        };

        await db.insert(users).values(newUser);
        break;
      case "user.deleted":
        console.log(event.data);
        break;
      case "user.authenticated":
        console.log(event.data);
        break;
      case "user.authentication_failed":
        console.log(event.data);
        break;
      default:
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}
