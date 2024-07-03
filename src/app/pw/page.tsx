"use client";

import { useState, useMemo, useEffect } from "react";
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
import {
  Copy,
  FilePenIcon,
  Plus,
  SearchIcon,
  Sparkles,
  TrashIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generate } from "generate-password-browser";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { addPassword, fetchPasswords } from "@/actions/prisma";
import { Textarea } from "@/components/ui/textarea";
type PasswordKey =
  | "id"
  | "userId"
  | "createdAt"
  | "password"
  | "title"
  | "category"
  | "userName"
  | "url"
  | "notes"
  | "email";
type Password = {
  id: string;
  userId: string;
  createdAt: Date;
  password: string;
  title: string;
  category: string;
  userName: string | null;
  url: string | null;
  notes: string | null;
  email: string | null;
};

export default function Component() {
  // const [passwords, setPasswords] = useState([
  //   {
  //     id: 1,
  //     name: "Gmail",
  //     username: "john@example.com",
  //     password: "Ht8$2Kd9",
  //     category: "Email",
  //   },
  //   {
  //     id: 2,
  //     name: "Netflix",
  //     username: "john123",
  //     password: "Qp7#Lm4F",
  //     category: "Entertainment",
  //   },
  //   {
  //     id: 3,
  //     name: "Bank of America",
  //     username: "johnsmith",
  //     password: "Xt9!Zw2P",
  //     category: "Finance",
  //   },
  //   {
  //     id: 4,
  //     name: "Amazon",
  //     username: "john.doe",
  //     password: "Mj5@Fy6B",
  //     category: "Shopping",
  //   },
  // ]);

  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [numbers, setNumbers] = useState(true);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");

  const [symbols, setSymbols] = useState(false);
  const [uppercase, setUppercase] = useState(true);
  const [category, setCategory] = useState("Login");
  const [length, setLength] = useState([8]);
  const [sortBy, setSortBy] = useState<PasswordKey>("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [generatedPassword, setGeneratedPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPasswords = await fetchPasswords();
      if (!fetchedPasswords) {
        return;
      }
      setPasswords(fetchedPasswords);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredPasswords = useMemo(() => {
    return passwords
      .filter((password) =>
        password?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a![sortBy] < b![sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a![sortBy] > b![sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [passwords, searchTerm, sortBy, sortOrder]);

  const generatePw = () => {
    const pw = generate({
      length: length[0],
      numbers: numbers,
      symbols: symbols,
      uppercase: uppercase,
    });
    setGeneratedPassword(pw);
  };
  const add = async () => {
    try {
      addPassword({
        title: title,
        username: username,
        password: generatedPassword,
        category: category,
        email: email,
        notes: notes,
        url: url,
      }).then((result) => {
        if (result) {
          setPasswords([
            ...passwords,
            {
              title: title,
              userName: username,
              password: generatedPassword,
              category: category,
              email: email,
              notes: notes,
              url: url,
              id: result.id,
              userId: result.userId,
              createdAt: result.createdAt,
            },
          ]);
          setTitle("");
          setUsername("");
          setGeneratedPassword("");
          setCategory("Login");
          setEmail("");
          setNotes("");
          setUrl("");
          toast.success("Password saved successfully");
        }
      });
    } catch (error) {
      console.error("Failed to save password:", error);
      toast.error("Failed to save password");
    }
  };
  // const updatePassword = (id, updatedPassword) => {
  //   setPasswords(passwords.map((p) => (p.id === id ? updatedPassword : p)));
  // };
  // const deletePassword = (id) => {
  //   setPasswords(passwords.filter((p) => p.id !== id));
  // };
  return (
    <div className="flex flex-col min-h-svh">
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
                <DialogTrigger>
                  <Plus size={18} className="mr-2" />
                  Add Password
                </DialogTrigger>
              </Button>
              <DialogContent className="bg-background px-4 py-6 rounded-md shadow-lg">
                <ScrollArea className="max-h-[88svh] border-b rounded-md w-full">
                  <DialogHeader>
                    <DialogTitle>Add Password</DialogTitle>
                    <DialogDescription>
                      Use the generated password or create your own.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2 px-2 mt-4 justify-center">
                    <div className="flex flex-col gap-1 items-start mb-4">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a title.."
                      />
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter a username"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter a Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          value={generatedPassword}
                          onChange={(e) => {
                            setGeneratedPassword(e.target.value);
                          }}
                        />
                        <Button
                          size={"icon"}
                          variant={"ghost"}
                          title="Copy Password"
                          className="rounded-full active:rotate-6 hover:animate-pulse transition-all duration-300 absolute right-10 top-6"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedPassword);
                            toast.success("Password copied to clipboard");
                          }}
                        >
                          <Copy size={18} color={"#bee5cb"} />
                        </Button>
                        <Button
                          size={"icon"}
                          title="Generate Password"
                          className="rounded-full active:rotate-6 hover:animate-pulse transition-all duration-300 absolute right-0 top-6"
                          onClick={generatePw}
                        >
                          <Sparkles size={20} />
                        </Button>
                      </div>
                      <div>
                        <Label htmlFor="length">
                          Length{" "}
                          <span className="text-muted-foreground text-xs">
                            {" "}
                            = {length}
                          </span>
                        </Label>
                        <Slider
                          id="length"
                          defaultValue={[8]}
                          value={length}
                          onValueChange={setLength}
                          min={4}
                          max={30}
                          step={1}
                        />
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <p className="text-xs text-muted-foreground">
                                Advanced Settings
                              </p>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex justify-around flex-wrap">
                                <div className="flex gap-1 p-1">
                                  Uppercase
                                  <label className="checkboxlabel">
                                    <input
                                      className="peer absolute h-0 w-0 opacity-0"
                                      type="checkbox"
                                      checked={uppercase}
                                      onChange={() => setUppercase(!uppercase)}
                                    />
                                    <span className="checkboxdesign" />
                                  </label>
                                </div>
                                <div className="flex gap-1 p-1">
                                  Symbols
                                  <label className="checkboxlabel">
                                    <input
                                      className="peer absolute h-0 w-0 opacity-0"
                                      type="checkbox"
                                      checked={symbols}
                                      onChange={() => setSymbols(!symbols)}
                                    />
                                    <span className="checkboxdesign" />
                                  </label>
                                </div>
                                <div className="flex gap-1 p-1">
                                  Numbers
                                  <label className="checkboxlabel">
                                    <input
                                      className="peer absolute h-0 w-0 opacity-0"
                                      type="checkbox"
                                      checked={numbers}
                                      onChange={() => setNumbers(!numbers)}
                                    />
                                    <span className="checkboxdesign" />
                                  </label>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add notes.."
                        />
                      </div>
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="Add URL.."
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          onValueChange={setCategory}
                          defaultValue={"Login"}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Login">Login</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="Entertainment">
                              Entertainment
                            </SelectItem>
                            <SelectItem value="Social">Social</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
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
                        Reset
                      </Button>
                      <Button
                        onClick={() => {
                          add();
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortBy("title");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Name{" "}
                  {sortBy === "title" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => {
                    setSortBy("userName");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Username{" "}
                  {sortBy === "userName" && (
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
                  <TableCell className="font-medium">
                    {password.title}
                  </TableCell>
                  <TableCell>{password.userName}</TableCell>
                  <TableCell>{password.category}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      // onClick={() =>
                      //   updatePassword(password.id, {
                      //     ...password,
                      //     name: "Updated Name",
                      //     username: "updated@example.com",
                      //     password: "NewPassword123!",
                      //     category: "Updated Category",
                      //   })
                      // }
                    >
                      <FilePenIcon size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      // onClick={() => deletePassword(password.id)}
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
    </div>
  );
}
