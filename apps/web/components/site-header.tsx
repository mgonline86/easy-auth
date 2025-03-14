import Image from "next/image";
import Link from "next/link";
import { NavUser } from "./nav-user";

export function SiteHeader() {
	return (
		<header
			data-slot="site-header"
			className="bg-background sticky top-0 z-50 flex w-full items-center shadow-sm"
		>
			<div className="flex h-14 w-full items-center gap-2 px-2 pr-4">
				<Link href="/" className="flex items-center gap-2 font-medium">
					<Image
						src="/logo-b.png"
						alt="logo"
						width={176}
						height={63}
						className="h-8 w-auto drop-shadow-md"
					/>
				</Link>
				<div className="ml-auto flex items-center gap-2">
					<NavUser />
				</div>
			</div>
		</header>
	);
}
