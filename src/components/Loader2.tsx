import React from "react";

export function Loader2() {
	const loaderStyle = {
		WebkitMask: `
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box
  `,
		mask: `
    conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box
  `,
		WebkitMaskComposite: "source-out",
		maskComposite: "subtract",
		animation: "l3 1s infinite linear",
	};

	return (
		<div
			style={loaderStyle}
			className="bg-muted-foreground p-2 aspect-square rounded-full w-14"
		>
			<style>{`
          @keyframes l3 {
            to {
              transform: rotate(1turn);
            }
          }
        `}</style>
		</div>
	);
}
