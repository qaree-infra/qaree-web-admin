// dev only module for copy&past (has no export)

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function CardDemo() {
	return (
		<Card>
			<CardContent>
				<CardHeader>
					<CardTitle>title</CardTitle>
					<CardDescription>description</CardDescription>
				</CardHeader>
				<div>content</div>
				<CardFooter>footer</CardFooter>
			</CardContent>
		</Card>
	);
}
