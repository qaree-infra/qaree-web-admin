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
			variables: { limit: 10, page: 1, completed: true },
			server: true,
		}),
		fetcher({
			query: getAllCategoriesQuery,
			variables: { limit: 10, page: 1, completed: false },
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

	// const { complete, incomplete, totalComplete, totaleIncomplete } =
	// 	await getData({
	// 		pageNumber,
	// 		size: Number(size),
	// 	});

	const complete = [
		{
			_id: "65ac7a503cd89365a3fd3336",
			name_en: "kfjdskf",
			name_ar: "بيسشتن",
			icon: {
				name: "category/icon/acmc6crbsmnicdnhhm5h",
				path: "https://res.cloudinary.com/dgg86hhf3/image/upload/v1706064035/category/icon/acmc6crbsmnicdnhhm5h.png",
			},
			background: "#186cb0",
			updatedAt: "1706064037021",
			createdAt: "1705802320588",
		},
		{
			_id: "65acb924b59e7da586b88445",
			name_en: "kfjdskf",
			name_ar: "بيسشتن",
			icon: {
				name: "category/icon/rsybmfgsf2eo0mnc2nj7",
				path: "https://res.cloudinary.com/dgg86hhf3/image/upload/v1705871722/category/icon/rsybmfgsf2eo0mnc2nj7.png",
			},
			background: "#186cb0",
			updatedAt: "1705871925936",
			createdAt: "1705818404516",
		},
		{
			_id: "65b375864cdfe73b3d5a1922",
			name_en: "distributed systems",
			name_ar: "نطم موزعة",
			icon: {
				name: "category/icon/qiaa0whpvsj1vjnmrxwd",
				path: "https://res.cloudinary.com/dgg86hhf3/image/upload/v1706259885/category/icon/qiaa0whpvsj1vjnmrxwd.png",
			},
			background: "#186cb0",
			updatedAt: "1706259887123",
			createdAt: "1706259846756",
		},
		{
			_id: "662d3175b64bc68215fe9106",
			name_en: "distributed systems",
			name_ar: "نطم موزعة",
			icon: {
				name: "category/icon/s9lkxlhtquo1gqdrrfh5",
				path: "https://res.cloudinary.com/dgg86hhf3/image/upload/v1714237887/category/icon/s9lkxlhtquo1gqdrrfh5.png",
			},
			background: "#186cb0",
			updatedAt: "1714237887978",
			createdAt: "1714237813361",
		},
		{
			_id: "662e2925453162421b518872",
			name_en: "test",
			name_ar: "اختبار",
			icon: {
				name: "category/icon/qhzd7kkblqaiumghsaet",
				path: "https://res.cloudinary.com/dgg86hhf3/image/upload/v1714301222/category/icon/qhzd7kkblqaiumghsaet.jpg",
			},
			background: "#aba6a6",
			updatedAt: "1714301222779",
			createdAt: "1714301221102",
		},
	];
	const totalComplete = 3;

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
				{/* {incomplete ? (
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
				)} */}
			</TabsContent>
		</Tabs>
	);
}
