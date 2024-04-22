import { Icons } from "../Icons";
import { Input } from "../ui/input";

function SearchForm() {
	return (
		<div className="bg-background/95 w-full max-w-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<form>
				<div className="relative">
					<Icons.search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search" className="pl-8" />
				</div>
			</form>
		</div>
	);
}

export default SearchForm;
