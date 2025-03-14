import { SiteHeader } from "@/components/site-header";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	if (!session || !session.user) return redirect("/auth/login");
	return (
		<>
			<SiteHeader />
			{children}
		</>
	);
}
