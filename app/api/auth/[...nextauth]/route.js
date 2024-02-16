import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "@/mongodb/userSchema";
import connectDB from "@/mongodb/connect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          name: "email",
          label: "email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          name: "password",
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          // const res = await authenticate({
          //   email: credentials.email,
          //   password: credentials.password,
          // });
          const { email, password } = credentials;

          try {
            await connectDB();
            let res = await UserModel.findOne({ email });

            if (res) {
              const isMatch = await bcrypt.compare(password, res?.password);
              if (!isMatch) throw new Error("Password didn't match.");

              const accessToken = jwt.sign({ email: email }, process.env.NEXTAUTH_JWT_SECRET, {
                expiresIn: "1h",
              });
              return {
                status: 202,
                token: accessToken,
                user: res,
              };
            }
            if (typeof res == "undefined" || res?.error) throw new Error("Unknown error " + res?.error);
          } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
          }
        } else {
          throw new Error("Missing credentials");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
