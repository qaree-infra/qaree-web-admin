import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function UsersPage() {
	return (
		<Tabs defaultValue="users" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="users">Users</TabsTrigger>
				<TabsTrigger value="admins">Admins</TabsTrigger>
			</TabsList>
			<TabsContent value="users">
				Make changes to your account here.
			</TabsContent>
			<TabsContent value="admins">sdklfj</TabsContent>
		</Tabs>
	);
}

export default UsersPage;
