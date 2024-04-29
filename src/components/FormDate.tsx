import { Button, type ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { Time } from "@/components/ui/time";

export interface SharedProps<T extends FieldValues> {
	/**
	 * Now the `form` prop is optional, the only benefit from it is to
	 * auto complete the `name` prop. or pass a generic to the component
	 */
	form?: UseFormReturn<T>;
	control?: UseFormReturn<T>["control"];
	name: FieldPath<T>;
}

interface FormDateProps<T extends FieldValues>
	extends SharedProps<T>,
		Pick<ButtonProps, "className" | "disabled"> {
	label: string;
	hint?: string;
	// onChange?: ((value: Date) => void) | ((value: Date) => Promise<void>);
}

export function FormDate<T extends FieldValues>({
	name,
	form: _,
	label,
	className,
	hint,
	disabled,
}: FormDateProps<T>) {
	const { control } = useFormContext<T>();
	const { field } = useController({
		control,
		name,
	});

	const date = field.value as Date | undefined;

	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem className="text-start">
					<FormLabel>{label}</FormLabel>
					<Popover onOpenChange={(open) => !open && field.onBlur()}>
						<PopoverTrigger asChild>
							<Button
								ref={field.ref}
								disabled={field.disabled || disabled}
								variant={"outline"}
								className={cn(
									"w-full justify-start text-left font-normal",
									!date && "text-muted-foreground",
									className,
								)}
								type="button"
							>
								<CalendarIcon className="me-2 size-4" />
								{date ? (
									<Time date={date}>{date.toLocaleDateString("en-US")}</Time>
								) : (
									<span>select date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={field.onChange}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					{hint && <FormDescription>{hint}</FormDescription>}
					<FormMessage />
					<input
						name={field.name}
						value={(field.value as Date)?.toISOString()}
						onChange={() => {
							/* */
						}}
						type="hidden"
					/>
				</FormItem>
			)}
		/>
	);
}
