"use client";

import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import FormInfo from "@/components/ui/form-info";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useMemo, useState } from "react";

export default function SignupForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const [state, action, isPending] = useActionState(signUp, undefined);

	const [showPassword, setShowPassword] = useState(false);

	const focusedField = useMemo(() => {
		if (state?.error) {
			return Object.keys(state.error)[0];
		}
	}, [state?.error]);

	return (
		<form
			action={action}
			className={cn("flex flex-col gap-6", className)}
			{...props}
			noValidate
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Signup</h1>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="John Doe"
						autoComplete="name"
						autoFocus={focusedField === "name" || !focusedField}
						minLength={3}
						required
						defaultValue={state?.inputs?.name as string}
					/>
					<FormError errors={state?.error?.name} />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="m@example.com"
						autoComplete="email"
						autoFocus={focusedField === "email"}
						required
						defaultValue={state?.inputs?.email as string}
					/>
					<FormError errors={state?.error?.email} />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							id="password"
							name="password"
							placeholder="••••••••"
							type={showPassword ? "text" : "password"}
							autoComplete="new-password"
							autoFocus={focusedField === "password"}
							pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
							required
							className="pe-9"
							defaultValue={state?.inputs?.password as string}
						/>
						<Button
							type="button"
							variant="link"
							size="icon"
							className="absolute right-0 top-0 cursor-pointer hover:opacity-80"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeIcon className="h-4 w-4" />
							) : (
								<EyeOffIcon className="h-4 w-4" />
							)}
						</Button>
					</div>
					{state?.error?.password ? (
						<FormError errors={`Password must${state?.error?.password}`} />
					) : (
						<FormInfo>
							Password must be at least 8 characters, contain at least one
							letter, one number, and one special character.
						</FormInfo>
					)}
				</div>
				<FormError errors={state?.message} />
				<Button
					type="submit"
					className="w-full cursor-pointer flex items-center justify-center gap-2"
					disabled={isPending}
				>
					Signup
					{isPending && <LoaderIcon className="animate-spin" />}
				</Button>
			</div>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link href="/auth/login" className="underline underline-offset-4">
					Login
				</Link>
			</div>
		</form>
	);
}
