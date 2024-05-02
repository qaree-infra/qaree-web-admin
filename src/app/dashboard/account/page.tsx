import type { Metadata } from "next";
import { fetcher } from "@/lib/graphql/fetcher";
import { getAdminInfoQuery } from "@/lib/graphql/queries";
import { AdminUpdateAccount } from "@/components/AdminUpdateAccount";
import { Separator } from "@/components/ui/separator";
import { UpdateAvatar } from "@/components/UpdateAvatar";
import { DeleteAccount } from "@/components/DeleteAccount";
import { tags } from "@/lib/config/tags";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Setting",
};

export interface AdminInfo {
	_id: string;
	name: string;
	email: string;
	avatar: {
		path: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}

const getData = async (): Promise<AdminInfo> => {
	const { getAdminInfo } = await fetcher({
		query: getAdminInfoQuery,
		server: true,
		tags: [tags.user],
	});

	// workaround -_- nullable values!
	return getAdminInfo as AdminInfo;
};

export default async function Account() {
	const { name, avatar } = await getData();

	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl font-medium mb-2">Admin Profile</h1>
				<p className=" max-w-5xl text-balance text-muted-foreground">
					Welcome to your Admin Profile dashboard. Here, you wield full control
					over your digital identity. Customize your avatar to reflect your
					unique personality and update essential account details such as your
					username and password.
				</p>
			</header>
			<Separator />
			<div className="grid 2xl:grid-cols-[1fr_0.5fr] gap-4">
				<AdminUpdateAccount oldName={name} />
				<div className="flex flex-col gap-4">
					<UpdateAvatar
						avatar={{
							path: avatar?.path,
							name,
						}}
					/>
					<DeleteAccount />
				</div>
			</div>
		</div>
	);
}
