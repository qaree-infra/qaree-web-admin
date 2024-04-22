import { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { redirect } from "next/navigation";
import { fetcher } from "./graphql/fetcher";
import { signInMutation } from "./graphql/mutations";
import { userInfoQuery } from "./graphql/queries";
import type { AuthUser } from "./graphql/types";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials, req) {
				const email = credentials?.email as string;
				const password = credentials?.password as string;
				const resetToken = req.body?.reset_token;

				if (resetToken) {
					// todo(security) validate the token

					// I need more data about user
					const { userInfo } = await fetcher({
						query: userInfoQuery,
						server: true,
						protectid: true,
						headers: {
							Authorization: `Bearer ${resetToken}`,
						},
						cache: "default",
					});

					return {
						access_token: resetToken,
						name: userInfo?.name as string,
						email: userInfo?.email as string,
						avatar: userInfo?.avatar as {
							size: number;
							path: string;
						},
					};
				}

				if (!email || !password) return null;

				const { signin } = await fetcher({
					query: signInMutation,
					variables: {
						email,
						password,
					},
					server: true,
					protectid: false,
					cache: "default",
				});

				if (!signin?.access_token) return null;

				// I need more data about user
				const { userInfo } = await fetcher({
					query: userInfoQuery,
					server: true,
					protectid: false,
					headers: {
						Authorization: `Bearer ${signin.access_token}`,
					},
					cache: "no-cache",
				});

				const user = {
					access_token: signin.access_token,
					name: userInfo?.name as string,
					email: userInfo?.email as string,
					avatar: userInfo?.avatar as {
						size: number;
						path: string;
					},
				};

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === "update") {
				return { ...token, ...session.user };
			}
			if (user) {
				token.name = user.name;
				token.email = user.email;
				token.access_token = user.access_token;
				token.avatar = user.avatar;
			}

			return { ...token, ...user };
		},
		async session({ session, token }) {
			if (token) {
				session.user = token as AuthUser;
			}
			return session;
		},
	},
	pages: {
		signIn: "/",
	},
};

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/signin");

	return session?.user;
}

declare module "next-auth" {
	interface User extends AuthUser {
		id?: string;
	}
	interface Session {
		user: AuthUser;
	}
}
declare module "next-auth/jwt" {
	interface JWT extends AuthUser {}
}
