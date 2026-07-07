export default function DashboardSkeleton() {

    return (

        <div className="animate-pulse space-y-8">

            <div className="h-12 w-72 rounded-xl bg-[var(--surface)]"/>

            <div className="grid grid-cols-4 gap-6">

                {Array.from({ length: 4 }).map((_, i)=>(

                    <div

                        key={i}

                        className="h-44 rounded-[32px] bg-[var(--surface)]"

                    />

                ))}

            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-6">

                <div className="h-[350px] rounded-[36px] bg-[var(--surface)]"/>

                <div className="h-[350px] rounded-[36px] bg-[var(--surface)]"/>

            </div>

        </div>

    );



}