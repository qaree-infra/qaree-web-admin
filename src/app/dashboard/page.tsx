import { getCurrentUser } from "@/lib/authOptions";

export default async function Dashboard() {
	const user = await getCurrentUser();

	if (!user) return;

	const { name } = user;

	return (
		<div className="container py-14">
			<h1 className="text-4xl">
				Welcome, <span>{name}</span>
			</h1>
		</div>
	);
}
