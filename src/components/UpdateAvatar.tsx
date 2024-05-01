"use client";

import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

import { updateAvatarSchema, type UpdateAvatarSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { SubmitButton } from "@/components/SmartForm";
import { uploadAdminAvatar } from "@/app/actions";
import { useRouter } from "next/navigation";
import { FormAvatar } from "./FormAvatar";

export function UpdateAvatar({
	avatar,
}: {
	avatar: {
		name: string;
		path: string;
	};
}) {
	const router = useRouter();

	const form = useForm<UpdateAvatarSchema>({
		mode: "onSubmit",
		resolver: zodResolver(updateAvatarSchema),
		defaultValues: {
			avatar: undefined,
		},
	});

	const onSubmit = async (values: UpdateAvatarSchema) => {
		const avatar = values.avatar;
		const formData = new FormData();
		formData.append("avatar", avatar);

		const { success, message } = await uploadAdminAvatar(formData);
		if (!success) {
			return toast.error(message);
		}
		toast.success(message);
	};

	return (
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<CardHeader>
						<CardTitle>Update Avatar</CardTitle>
						<CardDescription>
							Add or change your avatar by uploading an image (ideally 320x320
							pixels)
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-5">
						<FormAvatar form={form} name="avatar" avatar={avatar} />
					</CardContent>
					<CardFooter>
						<SubmitButton />
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
