"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import userService from "@/services/userService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetails } from "./components/user-details";
import { UserTable } from "./components/user-table";
import { UserSearch } from "./components/user-search";
import { useToast } from "@/hooks/use-toast";

export default function UserList() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users",
      });
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <UserSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          <UserTable users={filteredUsers} onSelectUser={handleSelectUser} />

          <UserDetails
            user={selectedUser}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </CardContent>
      </Card>
    </div>
  );
}