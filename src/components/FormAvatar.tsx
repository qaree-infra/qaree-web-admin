import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useId } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormElement, type SharedProps } from "./SmartForm";
import { FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormIconProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<"input">,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, Path<T>>
		> {
	avatar: {
		name: string;
		path: string;
	};
}

export function FormAvatar<T extends FieldValues>({
	form,
	name,
	avatar,
}: FormIconProps<T>) {
	const id = useId();

	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, onChange, ref, ...field }) => {
				const url = value ? URL.createObjectURL(value as File) : avatar.path;

				return (
					<div className="flex gap-4 items-center">
						<div>
							<Avatar className="size-24">
								<label htmlFor={id} className="cursor-pointer">
									<AvatarImage alt={`@${avatar.name}`} src={url} />
									<AvatarFallback className="text-2xl size-24">
										{avatar.name[0].toUpperCase()}
									</AvatarFallback>
								</label>
							</Avatar>
						</div>

						<div className="space-y-2">
							<FormLabel>@{avatar.name}</FormLabel>
							<Input
								id={id}
								type="file"
								accept="image/*"
								ref={ref}
								{...field}
								onChange={(ev) => {
									onChange(ev.target.files?.[0]);
									field.onBlur();
								}}
								onBlur={undefined}
							/>
						</div>
					</div>
				);
			}}
		/>
	);
}
