"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function ViewChildSwitch({
	switchLabel,
	children,
}: { children: React.ReactNode } & { switchLabel?: string }) {
	const [isShowen, setIsShowen] = useState(false);
	return (
		<>
			<div className="flex items-center space-x-2">
				<Switch id="" checked={isShowen} onCheckedChange={setIsShowen} className="cursor-pointer" />
				{switchLabel && <Label htmlFor="">{switchLabel}</Label>}
			</div>
			{isShowen && children}
		</>
	);
}
