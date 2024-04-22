import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useId } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormElement, type SharedProps } from "./SmartForm";

interface FormImageProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<"input">,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, Path<T>>
		> {
	label: string;
}

export function FormImage<T extends FieldValues>({
	form,
	name,
	label,
}: FormImageProps<T>) {
	const id = useId();

	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, onChange, ref, ...field }) => (
				<div>
					<label htmlFor={id} className="space-y-2">
						<div
							ref={ref}
							className={cn(
								"flex-center cursor-pointer rounded-sm  bg-muted text-muted-foreground  ",
								!value && "p-14",
								value && "relative h-40",
							)}
						>
							{!value ? (
								<ImageIcon className="h-12 w-12" />
							) : (
								<Image
									src={URL.createObjectURL(value as File)}
									alt="Book cover"
									className="h-full w-full object-contain object-center"
									fill
								/>
							)}
						</div>
						<p>{label}</p>
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
