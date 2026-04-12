"use client"
import { Appbar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export const Appbarprovider = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/signin") {
    return null;
  }

  return (
    <div className="bg-white/90 shadow-sm shadow-slate-200/40 backdrop-blur-sm">
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut({ redirect: false });
          router.push("/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
};