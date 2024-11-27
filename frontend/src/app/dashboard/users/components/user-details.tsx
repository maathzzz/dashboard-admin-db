"use client";

import { User } from "@/types/user";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface UserDetailsProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetails({ user, open, onOpenChange }: UserDetailsProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="font-medium">Name:</span>
                        <span className="col-span-2">{user.name}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="font-medium">Email:</span>
                        <span className="col-span-2">{user.email}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="font-medium">CPF:</span>
                        <span className="col-span-2">{user.cpf}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="font-medium">Country:</span>
                        <span className="col-span-2">{user.country}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="font-medium">State:</span>
                        <span className="col-span-2">{user.state}</span>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4">
                        <span className="font-medium">City:</span>
                        <span className="col-span-2">{user.city}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}