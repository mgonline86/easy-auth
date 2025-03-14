import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/session";
import Link from "next/link";

export async function NavUser() {
	const session = await getSession();
	if (!session || !session.user) return null;

	const { id, name, email, image } = session.user;
	const intial = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="link" size="icon" className="cursor-pointer">
					<Avatar className="size-8 rounded-md">
						<AvatarImage src={image} alt={name} />
						<AvatarFallback className="rounded-lg">{intial}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side="bottom"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage src={image} alt={name} />
							<AvatarFallback className="rounded-lg">{intial}</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{name}</span>
							<span className="text-muted-foreground truncate text-xs">
								{email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href="/api/auth/signout">
						<LogOut />
						Log out
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
