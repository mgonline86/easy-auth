import { Magnetic } from "@/components/motion-primitives/magnetic";
import { getSession } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	if (session?.user) return redirect("/");
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<Image
							src="/logo-b.png"
							alt="logo"
							width={176}
							height={63}
							className="h-8 w-auto drop-shadow-md"
						/>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">{children}</div>
				</div>
			</div>
			<div className="relative hidden bg-primary-foreground bg-radial from-primary-foreground to-90% to-primary/20 lg:w-[50vw] lg:flex lg:items-center lg:justify-center">
				<Magnetic intensity={0.8}>
					<Image
						src="/logo-b.png"
						alt="logo"
						width={595}
						height={210}
						className="h-auto w-full drop-shadow-2xl"
						sizes="(max-width: 768px) 100vw, 595px"
						priority
					/>
				</Magnetic>
			</div>
		</div>
	);
}
