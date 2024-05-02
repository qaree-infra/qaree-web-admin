import DeleteAccountAlert from "./DeleteAccountAlert";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function DeleteAccount() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Delete Account</CardTitle>
				<CardDescription>
					Deleting your account is a permanent action and cannot be undone. All
					your data will be permanently removed from our servers.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<DeleteAccountAlert />
			</CardFooter>
		</Card>
	);
}
