"use client";

import { User } from "@/types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserTableProps {
    users: User[];
    onSelectUser: (user: User) => void;
}

export function UserTable({ users, onSelectUser }: UserTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Endereço</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => onSelectUser(user)}
                    >
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.cpf}</TableCell>
                        <TableCell>{`${user.city}, ${user.state}, ${user.country}`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}