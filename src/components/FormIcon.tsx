import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useId } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormElement, type SharedProps } from "./SmartForm";
import { FormLabel } from "./ui/form";

interface FormIconProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<"input">,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, Path<T>>
		> {
	label: string;
}

export function FormIcon<T extends FieldValues>({
	form,
	name,
	label,
	className,
}: FormIconProps<T>) {
	const id = useId();

	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, onChange, ref, ...field }) => (
				<div>
					<label htmlFor={id} className="flex flex-col gap-2">
						<FormLabel>{label}</FormLabel>
						<div
							ref={ref}
							className={cn(
								"flex relative justify-center items-center cursor-pointer bg-muted text-muted-foreground h-24",
								className,
							)}
						>
							{!value ? (
								<ImageIcon />
							) : (
								<Image
									src={URL.createObjectURL(value as File)}
									alt="Icon"
									width={24}
									height={24}
									className="size-14"
								/>
							)}
						</div>
					</label>
					<input
						id={id}
						type="file"
						accept="image/*"
						{...field}
						onChange={(ev) => {
							onChange(ev.target.files?.[0]);
							field.onBlur();
						}}
						onBlur={undefined}
						className="sr-only appearance-none"
					/>
				</div>
			)}
		/>
	);
}
