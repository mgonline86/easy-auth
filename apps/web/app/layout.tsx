import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const qanelas = localFont({
	src: "./fonts/QanelasSoftRegular.otf",
	variable: "--font-qanelas",
});

export const metadata: Metadata = {
	title: "Easy Generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${qanelas.variable} font-[family-name:var(--font-qanelas)]`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
