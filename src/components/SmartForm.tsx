import { type ComponentProps, useId } from "react";

import type {
	ControllerRenderProps,
	FieldPath,
	FieldValues,
	UseFormReturn,
} from "react-hook-form";

import { useFormContext, useFormState } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

import { Label } from "@radix-ui/react-label";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Textarea } from "./ui/textarea";

// todo distribute the file and refactore this logic for more efficent way

export interface SharedProps<T extends FieldValues> {
	form?: UseFormReturn<T>;
	name: FieldPath<T>;
}

interface FormElementProps<T extends FieldValues, Name extends FieldPath<T>>
	extends SharedProps<T> {
	render: (filed: ControllerRenderProps<T, Name>) => React.JSX.Element;
}

export function FormElement<T extends FieldValues, Name extends FieldPath<T>>({
	form: __unused_form,
	name,
	render,
}: FormElementProps<T, Name>) {
	const form = useFormContext<T>();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{/* @ts-expect-error Why? */}
					<FormControl>{render(field)}</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

interface FormElementInputProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<typeof Input>,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, FieldPath<T>>
		> {
	label?: string;
}

export function FormInput<T extends FieldValues>({
	name,
	form,
	...props
}: FormElementInputProps<T>) {
	const id = useId();

	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, ...field }) => (
				<div className="flex flex-col gap-2">
					<FormLabel>{props.label}</FormLabel>
					<Input {...props} id={id} value={value ?? ""} {...field} />
				</div>
			)}
		/>
	);
}

export function FormInputOTP<T extends FieldValues>({
	name,
	form,
}: FormElementInputProps<T>) {
	const id = useId();

	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, ...field }) => (
				<InputOTP
					maxLength={6}
					{...field}
					id={id}
					pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
					render={({ slots }) => (
						<InputOTPGroup>
							{slots.map((slot, index) => (
								<InputOTPSlot key={index} {...slot} />
							))}{" "}
						</InputOTPGroup>
					)}
				/>
			)}
		/>
	);
}

type Item = { label: string; value: string };

interface FormElementSelectProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<typeof Select>,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, FieldPath<T>>
		> {
	label: string;
	items: Item[];
	showLabel?: boolean;
	placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
	name,
	form,
	label,
	items,
	placeholder,
	showLabel,
	...props
}: FormElementSelectProps<T>) {
	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, onChange, ref, ...field }) => (
				<Select
					onValueChange={onChange}
					defaultValue={value}
					{...field}
					{...props}
				>
					{showLabel && <Label>{label}</Label>}
					<div className="group">
						<SelectTrigger ref={ref}>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>

						<SelectContent>
							{items?.map((item) => (
								<SelectItem
									key={item.value}
									value={item.value}
									className="capitalize"
								>
									{item?.label}
								</SelectItem>
							))}
						</SelectContent>
					</div>
				</Select>
			)}
		/>
	);
}

export const SubmitButton = <T extends FieldValues>({
	children,
}: {
	children?: React.ReactNode;
	props?: React.ComponentPropsWithRef<typeof Button>;
}) => {
	const formState = useFormState<T>();
	return (
		<Button
			type="submit"
			className="w-full"
			isLoading={
				formState.isSubmitting || formState.isLoading || formState.isValidating
			}
		>
			{children ? children : "Submit"}
		</Button>
	);
};

export function FormErrors<T extends FieldValues>() {
	const form = useFormContext<T>();

	return (
		Object.values(form.formState.errors).length > 0 && (
			<div className="py-2 text-sm">
				<h3 className="text-lg font-semibold">There are some errors</h3>
				<ul>
					{Object.values(form.formState.errors).map((error, idx) => {
						const errorMessage =
							typeof error?.message === "string" ? error?.message : "";

						return <li key={`${idx}-${error?.message}`}>{errorMessage}</li>;
					})}
				</ul>
			</div>
		)
	);
}

interface FormElementTextareaProps<T extends FieldValues>
	extends SharedProps<T>,
		Omit<
			ComponentProps<typeof Textarea>,
			"form" | "name" | "id" | keyof ControllerRenderProps<T, FieldPath<T>>
		> {
	label: string;
}

export function FormTextare<T extends FieldValues>({
	name,
	form,
	label,
	...props
}: FormElementTextareaProps<T>) {
	const id = useId();
	return (
		<FormElement
			form={form}
			name={name}
			render={({ value, ...field }) => (
				<div>
					<FormLabel>{label}</FormLabel>
					<Textarea {...props} id={id} value={value ?? ""} {...field} />
				</div>
			)}
		/>
	);
}
