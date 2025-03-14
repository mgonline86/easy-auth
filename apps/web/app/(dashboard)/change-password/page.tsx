import { callProtectedRoute } from "@/lib/actions";

export default async function ChangePasswordPage() {
	const res = await callProtectedRoute();

	return (
		<main>
			Change Password
			<p>{JSON.stringify(res)}</p>
		</main>
	);
}
