// dev only module for copy&past (has no export)

import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

function CardDemo() {
	return (
		<Card>
			<CardContent>
				<CardHeader>
					<CardTitle>title</CardTitle>
					<CardDescription>description</CardDescription>
					<div>content</div>
					<CardFooter>footer</CardFooter>
				</CardHeader>
			</CardContent>
		</Card>
	);
}
