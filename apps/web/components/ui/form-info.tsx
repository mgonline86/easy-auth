import { cn } from "@/lib/utils";

export default function FormInfo({
	children,
	className,
	...props
}: React.ComponentProps<"p">) {
	if (!children) {
		return null;
	}

	return (
		<p className={cn("text-muted-foreground text-xs", className)} {...props}>
			{children}
		</p>
	);
}
