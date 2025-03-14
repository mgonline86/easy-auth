import UserProtectedId from "@/components/user-protected-id";
import ViewChildSwitch from "@/components/view-child-switch";

export default function DashboardPage() {
	return (
		<main className="flex flex-col gap-4 h-[calc(100vh-3.5rem)] items-center justify-center p-4 ">
			<h1 className="text-center text-xl font-bold md:text-5xl">Welcome to the application.</h1>
			<ViewChildSwitch switchLabel="Show User ID">
				<UserProtectedId />
			</ViewChildSwitch>
		</main>
	);
}
