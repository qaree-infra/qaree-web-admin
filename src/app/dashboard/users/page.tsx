import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetcher } from "@/lib/graphql/fetcher";
import { adminGetAllUsersQuery } from "@/lib/graphql/queries";
import { UsersDataTable } from "./data-table-users";
import { type User, columns } from "./columns-users";

const getUsers = async ({
	pageNumber,
	size,
}: {
	pageNumber: number;
	size: number;
}) => {
	const { adminGetAllUsers } = await fetcher({
		query: adminGetAllUsersQuery,
		variables: {
			limit: size,
			page: pageNumber,
		},
		server: true,
	});

	if (!adminGetAllUsers) {
		return {
			total: 0,
			users: [],
		} as const;
	}

	return adminGetAllUsers;
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

	const { users, total } = await getUsers({ pageNumber, size: Number(size) });

	return (
		<Tabs defaultValue="users">
			<TabsList>
				<TabsTrigger value="users">Users</TabsTrigger>
				<TabsTrigger value="admins">Admins</TabsTrigger>
			</TabsList>
			<TabsContent value="users">
				<UsersDataTable
					columns={columns}
					data={users as User[]}
					paginationConfig={{
						rowCount: total ?? 0,
						state: {
							pageIndex: pageNumber - 1,
							pageSize: Number(size),
						},
					}}
				/>
			</TabsContent>
			<TabsContent value="admins">sdklfj</TabsContent>
		</Tabs>
	);
}
