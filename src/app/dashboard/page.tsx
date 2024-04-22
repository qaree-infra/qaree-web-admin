import { getCurrentUser } from "@/lib/authOptions";

export default async function Dashboard() {
	const user = await getCurrentUser();

	if (!user) return;

	const { name } = user;

	return (
		<div>
			<h1 className="text-4xl">
				Welcome, <span>{name}</span>
			</h1>
			<p>Home Page</p>
		</div>
	);
}
