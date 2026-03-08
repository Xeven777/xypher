import { fetchPasswords } from "@/actions/prisma";
import { decrypt } from "@/actions/cipher";
import zxcvbn from "zxcvbn";
import Link from "next/link";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const passwords = await fetchPasswords();

  if (!passwords) return <div className="p-10">Loading...</div>;

  const auditedPasswords = passwords.map((p) => {
    const decrypted = decrypt(p.password);
    const strength = zxcvbn(decrypted);
    return {
      ...p,
      score: strength.score, // 0-4
      isReused: passwords.filter((other) => other.id !== p.id && decrypt(other.password) === decrypted).length > 0,
    };
  });

  const weakPasswords = auditedPasswords.filter((p) => p.score <= 2);
  const reusedPasswords = auditedPasswords.filter((p) => p.isReused);

  return (
    <div className="container mt-20 max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Security Audit</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-6 border rounded-lg bg-red-50 dark:bg-red-950/20">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> Weak
          </h3>
          <p className="text-3xl font-bold mt-2">{weakPasswords.length}</p>
        </div>
        <div className="p-6 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="text-orange-500" /> Reused
          </h3>
          <p className="text-3xl font-bold mt-2">{reusedPasswords.length}</p>
        </div>
        <div className="p-6 border rounded-lg bg-green-50 dark:bg-green-950/20">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> Secure
          </h3>
          <p className="text-3xl font-bold mt-2">
            {auditedPasswords.length - weakPasswords.length - reusedPasswords.length}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Issues Found</h2>
          {weakPasswords.length === 0 && reusedPasswords.length === 0 ? (
            <p className="text-muted-foreground">No major security issues found. Good job!</p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
               <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4">Account</th>
                    <th className="p-4">Issue</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {weakPasswords.map((p) => (
                    <tr key={p.id}>
                      <td className="p-4 font-medium">{p.title}</td>
                      <td className="p-4">
                        <Badge variant="destructive">Weak Password</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/pw/${p.id}`} className="text-primary hover:underline">
                          Fix
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {reusedPasswords.map((p) => (
                    <tr key={p.id}>
                      <td className="p-4 font-medium">{p.title}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-orange-500 text-orange-500">Reused Password</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/pw/${p.id}`} className="text-primary hover:underline">
                          Fix
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
