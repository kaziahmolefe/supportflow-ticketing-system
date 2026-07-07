import Dashboard from "@/components/dashboard/Dashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/skeletons/DashboardSkeleton";


export default async function Home() {

    return (

        <Suspense fallback={<DashboardSkeleton/>}>

            <Dashboard/>

        </Suspense>
    );
}