"use client";

import { Button } from "@/components/ui/button";
import { Download, Upload, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { addPassword, fetchDecryptedPasswords } from "@/actions/prisma";
import { z } from "zod";

const PasswordImportSchema = z.object({
  title: z.string().min(1).max(255),
  username: z.string().max(255).optional().or(z.literal("")),
  password: z
    .string()
    .min(8)
    .max(256)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and numbers",
    ),
  category: z.enum([
    "Login",
    "Education",
    "Software",
    "Finance",
    "Shopping",
    "Email",
    "Entertainment",
    "Social",
    "Other",
  ]),
  email: z
    .string()
    .email()
    .optional()
    .or(z.literal(""))
    .or(z.string().length(0)),
  url: z.string().url().optional().or(z.literal("")),
  notes: z.string().max(5000).optional().or(z.literal("")),
});

export default function ImportExportButtons({
  passwords,
}: {
  passwords: any[];
}) {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportToJson = async () => {
    const confirmed = window.confirm(
      "WARNING: This will export ALL your passwords in UNENCRYPTED plaintext. Ensure you are on a private device and delete the file after use. Do you want to continue?",
    );
    if (!confirmed) return;

    setExporting(true);
    try {
      const decryptedPasswords = await fetchDecryptedPasswords();
      if (!decryptedPasswords) {
        toast.error("Failed to fetch passwords for export");
        return;
      }

      // Remove sensitive DB fields before export
      const exportData = decryptedPasswords.map(
        ({ id, userId, createdAt, ...rest }) => rest,
      );

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = "xypher_passwords_UNENCRYPTED.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      toast.success("Passwords exported (decrypted) to JSON");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export passwords");
    } finally {
      setExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        // Basic CSV parsing (Title, Username, Password, Category, Email, URL, Notes)
        const rows = text.split("\n").filter((row) => row.trim() !== "");
        const headers = rows[0].split(",").map((h) => h.trim().toLowerCase());

        const importedData = rows.slice(1).map((row) => {
          const values = row.split(",").map((v) => v.trim());
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });

        let successCount = 0;
        let failCount = 0;
        for (const item of importedData) {
          try {
            // Basic sanitization: Ensure required fields have at least empty strings if missing
            const sanitizedItem = {
              ...item,
              username: item.username || "",
              category: item.category || "Login",
              email: item.email || "",
              url: item.url || "",
              notes: item.notes || "",
            };

            const validated = PasswordImportSchema.parse(sanitizedItem);
            await addPassword(validated);
            successCount++;
          } catch (error) {
            console.error("Row validation failed:", error);
            failCount++;
          }
        }

        if (failCount > 0) {
          toast.warning(
            `Imported ${successCount} passwords. ${failCount} rows failed validation.`,
          );
        } else {
          toast.success(`Imported ${successCount} passwords successfully`);
        }

        window.location.reload(); // Refresh to see new passwords
      } catch (error) {
        console.error("Import failed:", error);
        toast.error(
          "Failed to import passwords. Ensure CSV format is correct.",
        );
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToJson}
        disabled={exporting}
      >
        {exporting ? (
          <Loader2 size={16} className="mr-2 animate-spin" />
        ) : (
          <Download size={16} className="mr-2" />
        )}
        Export JSON
      </Button>
      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".csv"
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={importing}
        >
          {importing ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Upload size={16} className="mr-2" />
          )}
          Import CSV
        </Button>
      </div>
    </div>
  );
}
