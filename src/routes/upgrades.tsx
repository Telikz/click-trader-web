import { createFileRoute } from "@tanstack/react-router";
import UpgradeForm from "~/components/UpgradeForm";
import UpgradesList from "~/components/UpgradesList";
import { useUpgrades } from "~/stores/useUpgradeStore";

export const Route = createFileRoute("/upgrades")({
   component: RouteComponent,
});

function RouteComponent() {
   const upgrades = Array.from(useUpgrades().upgrades.values());

   return (
      <div className="min-h-screen bg-base-200 p-4 flex flex-col items-center">
         <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/5">
               <UpgradeForm />
            </div>
            <UpgradesList upgrades={upgrades} />
         </div>
      </div>
   );
}
