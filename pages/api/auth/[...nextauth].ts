import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export default NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_OAUTH_ID as string,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET as string
        }),
    ],
})
