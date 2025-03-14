import { cn } from "@/lib/utils";

export default function FormError({
	errors = "",
	className,
	...props
}: React.ComponentProps<"p"> & { errors?: string | string[] }) {
	if (!errors) {
		return null;
	}

	return (
		<p
			className={cn("text-destructive-foreground text-sm", className)}
			{...props}
		>
			{Array.isArray(errors) ? errors.join(",") : errors}
		</p>
	);
}
