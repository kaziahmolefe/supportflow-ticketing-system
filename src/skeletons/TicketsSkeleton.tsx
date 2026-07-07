export default function TicketsSkeleton() {

    return (
        <div className="animate-pulse space-y-4">

            {Array.from({length:8}).map((_,i)=>(

            <div

                key={i}

                className="h-20 rounded-3xl bg-[var(--surface)]"

            />

            ))}

        </div>
    );
}