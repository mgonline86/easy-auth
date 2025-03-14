import { callProtectedRoute } from "@/lib/actions";
import { cn } from "@/lib/utils";

export default async function UserProtectedId({
	className,
	...props
}: React.ComponentProps<"p">) {
	const { message } = await callProtectedRoute();

	return (
		<p {...props} className={cn("text-muted-foreground text-xs text-center", className)}>
			{message}
		</p>
	);
}
