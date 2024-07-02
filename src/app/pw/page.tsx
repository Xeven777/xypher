"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Component() {
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      name: "Gmail",
      username: "john@example.com",
      password: "Ht8$2Kd9",
      category: "Email",
    },
    {
      id: 2,
      name: "Netflix",
      username: "john123",
      password: "Qp7#Lm4F",
      category: "Entertainment",
    },
    {
      id: 3,
      name: "Bank of America",
      username: "johnsmith",
      password: "Xt9!Zw2P",
      category: "Finance",
    },
    {
      id: 4,
      name: "Amazon",
      username: "john.doe",
      password: "Mj5@Fy6B",
      category: "Shopping",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const filteredPasswords = useMemo(() => {
    return passwords
      .filter((password) =>
        password.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [passwords, searchTerm, sortBy, sortOrder]);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    setGeneratedPassword(password);
  };
  const addPassword = (password) => {
    setPasswords([...passwords, password]);
  };
  const updatePassword = (id, updatedPassword) => {
    setPasswords(passwords.map((p) => (p.id === id ? updatedPassword : p)));
  };
  const deletePassword = (id) => {
    setPasswords(passwords.filter((p) => p.id !== id));
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Password Manager</h1>
      </header>
      <main className="flex-1 bg-background p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search passwords..."
              className="pl-10 pr-4 py-2 rounded-md w-full bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPasswordGenerator(true)}
            >
              Generate Password
            </Button>
            <Button
              onClick={() =>
                addPassword({
                  id: passwords.length + 1,
                  name: "",
                  username: "",
                  password: "",
                  category: "",
                })
              }
            >
              Add Password
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortBy("name");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Name{" "}
                  {sortBy === "name" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortBy("username");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Username{" "}
                  {sortBy === "username" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortBy("category");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Category{" "}
                  {sortBy === "category" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPasswords.map((password) => (
                <TableRow key={password.id}>
                  <TableCell className="font-medium">{password.name}</TableCell>
                  <TableCell>{password.username}</TableCell>
                  <TableCell>{password.category}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updatePassword(password.id, {
                          ...password,
                          name: "Updated Name",
                          username: "updated@example.com",
                          password: "NewPassword123!",
                          category: "Updated Category",
                        })
                      }
                    >
                      <FilePenIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deletePassword(password.id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      {showPasswordGenerator && (
        <Dialog
          open={showPasswordGenerator}
          onOpenChange={setShowPasswordGenerator}
        >
          <DialogContent className="bg-background p-6 rounded-md shadow-lg">
            <DialogHeader>
              <DialogTitle>Generate Password</DialogTitle>
              <DialogDescription>
                Use the generated password or create your own.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <Input
                type="text"
                value={generatedPassword}
                readOnly
                className="pr-12 bg-muted text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="outline" onClick={generatePassword}>
                Generate
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="password-name">Name</Label>
                <Input id="password-name" placeholder="Enter a name" />
              </div>
              <div>
                <Label htmlFor="password-username">Username</Label>
                <Input id="password-username" placeholder="Enter a username" />
              </div>
              <div>
                <Label htmlFor="password-password">Password</Label>
                <Input
                  id="password-password"
                  value={generatedPassword}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="password-category">Category</Label>
                <Input id="password-category" placeholder="Enter a category" />
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordGenerator(false);
                  setGeneratedPassword("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addPassword({
                    id: passwords.length + 1,
                    name: "New Password",
                    username: "new@example.com",
                    password: generatedPassword,
                    category: "New Category",
                  });
                  setShowPasswordGenerator(false);
                  setGeneratedPassword("");
                }}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
