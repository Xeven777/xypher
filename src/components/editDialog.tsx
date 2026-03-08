"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, Sparkles } from "lucide-react";
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
import { updatePassword } from "@/actions/prisma";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const EditDialog = ({
  passwordDetails,
  decryptedPassword,
}: {
  passwordDetails: any;
  decryptedPassword: string;
}) => {
  const [title, setTitle] = useState(passwordDetails.title);
  const [username, setUsername] = useState(passwordDetails.userName);
  const [email, setEmail] = useState(passwordDetails.email);
  const [notes, setNotes] = useState(passwordDetails.notes);
  const [url, setUrl] = useState(passwordDetails.url);
  const [category, setCategory] = useState(passwordDetails.category);
  const [tagsInput, setTagsInput] = useState(passwordDetails.tags?.join(", ") || "");
  const [tags, setTags] = useState<string[]>(passwordDetails.tags || []);
  const [loading, setLoading] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState(
    decryptedPassword || "error"
  );
  const [length, setLength] = useState([8]);
  const [uppercase, setUppercase] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [numbers, setNumbers] = useState(true);
  const router = useRouter();
  const generatePw = () => {
    const pw = generate({
      length: length[0],
      numbers: numbers,
      symbols: symbols,
      uppercase: uppercase,
    });
    setGeneratedPassword(pw);
  };
  const handleUpdate = async () => {
    if (!title || !generatedPassword || (!username && !email)) {
      toast.error("Title, password and username or email are required");
      return;
    }
    setLoading(true);
    const passwordData = {
      id: passwordDetails.id,
      title,
      username,
      password: generatedPassword,
      category,
      email,
      notes,
      url,
      tags,
    };

    try {
      const updatedPassword = await updatePassword(passwordData);
      if (updatedPassword) {
        toast.success("Password updated successfully.");
      } else {
        toast.error("An error occurred while updating the password.");
      }
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error("An unexpected error occurred:", error);
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <Button asChild>
        <DialogTrigger>
          Edit{" "}
          <span>
            <Edit size={18} className="ml-2" />
          </span>
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
                  placeholder="Enter a username or phone number associated"
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
                  placeholder="Generated or add your Password"
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
                    if (!generatedPassword) {
                      toast.error("No password to copy");
                      return;
                    }
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
              <PasswordStrengthMeter password={generatedPassword} />
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
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTagsInput(val);
                    const rawTags = val
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag !== "" && tag.length <= 50);
                    setTags(rawTags.slice(0, 10));
                  }}
                  placeholder="e.g. Work, Personal, Social"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategory} defaultValue={"Login"}>
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
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
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
                  handleUpdate();
                }}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
                {loading && (
                  <span className="animate-spin">
                    <Loader2 size={18} />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
