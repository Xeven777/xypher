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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FilePenIcon, SearchIcon, TrashIcon } from "lucide-react";
import CheckboxComponent from "@/components/ui/checkbox2";
import { TextureButton } from "@/components/ui/texture-button";
import { generate } from "generate-password-browser";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePw = () => {
    const pw = generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      strict: true,
    });
    setGeneratedPassword(pw);
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
            <Dialog>
              <Button asChild>
                <DialogTrigger>Open</DialogTrigger>
              </Button>
              <DialogContent className="bg-background p-6 rounded-md shadow-lg">
                <DialogHeader>
                  <DialogTitle>Add Password</DialogTitle>
                  <DialogDescription>
                    Use the generated password or create your own.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between mb-4">
                  <Input type="text" value={generatedPassword} readOnly />
                  <Button size={"sm"} onClick={generatePw}>
                    Generate
                  </Button>
                </div>
                <CheckboxComponent />
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="password-name">Name</Label>
                    <Input id="password-name" placeholder="Enter a name" />
                  </div>

                  <div>
                    <Label htmlFor="password-username">Username</Label>
                    <Input
                      id="password-username"
                      placeholder="Enter a username"
                    />
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
                    <Label htmlFor="length">Length</Label>
                    <Slider id="length" defaultValue={[8]} max={25} step={1} />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
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
                      setGeneratedPassword("");
                    }}
                  >
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button>Add Password</Button>
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
                      <FilePenIcon size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deletePassword(password.id)}
                    >
                      <TrashIcon size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      {/* {showPasswordGenerator && (
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
      )} */}
    </div>
  );
}
