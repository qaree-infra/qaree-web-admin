interface Props extends React.TimeHTMLAttributes<HTMLTimeElement> {
	date: Date;
}

export function Time({ date, dateTime, ...props }: Props) {
	return (
		<time
			{...props}
			dateTime={dateTime ?? date.toISOString()}
			suppressHydrationWarning
		/>
	);
}
