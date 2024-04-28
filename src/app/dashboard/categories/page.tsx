import { fetcher } from "@/lib/graphql/fetcher";
import { getAllCategoriesQuery } from "@/lib/graphql/queries";
import { CategoriesDataTable } from "./data-table";
import { Category, columns } from "./columns";
import { NoBooksFound } from "@/components/skeleton/NoBooksFound";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryAction } from "@/components/CategoryAction";

const getData = async ({
	pageNumber,
	size,
}: { pageNumber: number; size: number }) => {
	const [complete, incomplete] = await Promise.all([
		fetcher({
			query: getAllCategoriesQuery,
			variables: { limit: size, page: pageNumber, completed: true },
			server: true,
		}),
		fetcher({
			query: getAllCategoriesQuery,
			variables: { limit: size, page: pageNumber, completed: false },
			server: true,
		}),
	]);

	return {
		complete: complete.getAllCategories?.categories,
		incomplete: incomplete.getAllCategories?.categories,
		totalComplete: incomplete.getAllCategories?.totalCompleted,
		totaleIncomplete: complete.getAllCategories?.totalCompleted,
	};
};

interface Props {
	searchParams: {
		page: string;
		size: string;
	};
}
export default async function Categories({
	searchParams: { page = "1", size = "10" },
}: Props) {
	let pageNumber = Number(page);
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}

	const { complete, incomplete, totalComplete, totaleIncomplete } =
		await getData({
			pageNumber,
			size: Number(size),
		});

	return (
		<Tabs defaultValue="complete">
			<div className="flex justify-between">
				<TabsList>
					<TabsTrigger value="complete">Complete</TabsTrigger>
					<TabsTrigger value="incomplete">Incomplete</TabsTrigger>
				</TabsList>
				<CategoryAction />
			</div>
			<TabsContent value="complete">
				{complete ? (
					<CategoriesDataTable
						// @ts-ignore nullable values
						columns={columns}
						// @ts-ignore nullable values
						data={complete}
						paginationConfig={{
							rowCount: totalComplete ?? 0,
							state: {
								pageIndex: pageNumber - 1,
								pageSize: Number(size),
							},
						}}
					/>
				) : (
					<NoBooksFound />
				)}
			</TabsContent>
			<TabsContent value="incomplete">
				{incomplete ? (
					<CategoriesDataTable
						// @ts-ignore nullable values
						columns={columns}
						// @ts-ignore nullable values
						data={incomplete}
						paginationConfig={{
							rowCount: totaleIncomplete ?? 0,
							state: {
								pageIndex: pageNumber - 1,
								pageSize: Number(size),
							},
						}}
					/>
				) : (
					<NoBooksFound />
				)}
			</TabsContent>
		</Tabs>
	);
}
