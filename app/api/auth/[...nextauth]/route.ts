import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { compare } from "bcryptjs";
import {JWT} from "next-auth/jwt";
import {Session} from "next-auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDB();

                const user = await User.findOne({ email: credentials?.email });
                if (!user) throw new Error("No user found with this email");

                const isPasswordCorrect = await compare(
                    credentials!.password,
                    user.password
                );

                if (!isPasswordCorrect) throw new Error("Invalid password");

                return { id: user._id, name: user.name, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) { // @ts-ignore
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
