export const dynamic = "force-dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher } from "@/lib/graphql/fetcher";
import { adminGetAllUsersQuery, getAdminsQuery } from "@/lib/graphql/queries";
import { type AdminUser, type User, columns } from "./columns-users";
import { UsersDataTable } from "./data-table-users";

import { RegisterAdmin } from "@/components/RegisterAdmin";
import { tags } from "@/lib/config/tags";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Users",
};

const getAllUsers = async ({
	pageNumber,
	size,
}: { pageNumber: number; size: number }) => {
	// Fetch users and admins concurrently using Promise.all
	const [users, admins] = await Promise.all([
		fetcher({
			query: adminGetAllUsersQuery,
			variables: { limit: size, page: pageNumber },
			server: true,
			tags: [tags.users],
		}),
		fetcher({
			query: getAdminsQuery,
			variables: { limit: size, page: pageNumber },
			server: true,
			tags: [tags.users, tags.user],
		}),
	]);

	// Extract data from resolved promises
	return {
		users: users.adminGetAllUsers?.users,
		admins: admins.getAdmins?.admins,
		totaleUsers: users.adminGetAllUsers?.total,
		totaleAdmins: admins.getAdmins?.total,
	};
};

interface Props {
	searchParams: {
		page: string;
		size: string;
	};
}

export default async function UsersPage({
	searchParams: { page = "1", size = "10" },
}: Props) {
	let pageNumber = Number(page);
	// Never trust user input
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}

	const { users, admins, totaleAdmins, totaleUsers } = await getAllUsers({
		pageNumber,
		size: Number(size),
	});

	return (
		<Tabs defaultValue="users">
			<div className="flex justify-between items-center">
				<TabsList>
					<TabsTrigger value="users">Users</TabsTrigger>
					<TabsTrigger value="admins">Admins</TabsTrigger>
				</TabsList>
				<RegisterAdmin />
			</div>

			<TabsContent value="users">
				<UsersDataTable
					columns={columns}
					data={users as User[]}
					paginationConfig={{
						rowCount: totaleUsers ?? 0,
						state: {
							pageIndex: pageNumber - 1,
							pageSize: Number(size),
						},
					}}
				/>
			</TabsContent>
			<TabsContent value="admins">
				<UsersDataTable
					columns={columns}
					data={admins as AdminUser[]}
					paginationConfig={{
						rowCount: totaleAdmins ?? 0,
						state: {
							pageIndex: pageNumber - 1,
							pageSize: Number(size),
						},
					}}
				/>
			</TabsContent>
		</Tabs>
	);
}
