import { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { redirect } from "next/navigation";
import { fetcher } from "./graphql/fetcher";
import { signInMutation } from "./graphql/mutations";
import { getAdminInfoQuery } from "./graphql/queries";
import type { AuthUser } from "./graphql/types";
import { tags } from "./config/tags";

// TODO: remove the placeholder data
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
			async authorize(credentials) {
				const email = credentials?.email as string;
				const password = credentials?.password as string;

				if (!email || !password) return null;

				const { signIn } = await fetcher({
					query: signInMutation,
					variables: {
						email,
						password,
					},
					server: true,
					protectid: false,
				});

				if (!signIn?.access_token) return null;

				// I need more data about user
				const { getAdminInfo } = await fetcher({
					query: getAdminInfoQuery,
					server: true,
					protectid: false,
					headers: {
						Authorization: `Bearer ${signIn.access_token}`,
					},
					tags: [tags.user],
				});

				const user = {
					access_token: signIn.access_token,
					name: getAdminInfo?.name as string,
					email: getAdminInfo?.email as string,
					avatar: getAdminInfo?.avatar as {
						path: string;
					},
				};

				return user;
			},
		}),
	],
	session: {
		maxAge: 60 * 55,
	},
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === "update") {
				return { ...token, ...session?.user };
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
