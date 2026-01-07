"use client"
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { signIn,signOut}from "next-auth/react";
export default function Home() {
 const user=useSession()
  return (
    <div className={styles.page}>
       <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
      {JSON.stringify(user)??"no data"}
    </div>
  );
}