// components/Navbar.tsx
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import styles from "./Navbar.module.css";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>
        🎬 CinemaGo
      </Link>

      <div className={styles.actions}>
        {user ? (
          <>
            <span className={styles.greeting}>สวัสดี, {user.name}</span>
            <form action={logoutAction}>
              <button type="submit" className={styles.btnOutline}>
                ออกจากระบบ
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.btnOutline}>
              เข้าสู่ระบบ
            </Link>
            <Link href="/register" className={styles.btnSolid}>
              สมัครสมาชิก
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}