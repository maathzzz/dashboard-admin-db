import { cn } from "@/lib/utils";

interface ProductStatusProps {
    status: "In Stock" | "Low Stock" | "Out of Stock";
    className?: string;
}

export function ProductStatus({ status, className }: ProductStatusProps) {
    const statusStyles = {
        "In Stock": "bg-green-100 text-green-800",
        "Low Stock": "bg-yellow-100 text-yellow-800",
        "Out of Stock": "bg-red-100 text-red-800",
    };

    return (
        <div className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusStyles[status],
            className
        )}>
            {status}
        </div>
    );
}