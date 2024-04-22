import type { ReactNode } from "react";

function CenteredWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="container flex-1 flex items-center justify-center">
			{children}
		</div>
	);
}

export default CenteredWrapper;
