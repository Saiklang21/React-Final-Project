// app/login/page.tsx
"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import Link from "next/link";
import styles from "@/components/AuthForm.module.css";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>เข้าสู่ระบบ</h1>

        <form action={formAction}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>อีเมล</label>
            <input id="email" name="email" type="email" required className={styles.input} />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>รหัสผ่าน</label>
            <input id="password" name="password" type="password" required className={styles.input} />
          </div>

          {state?.error && <p className={styles.error}>{state.error}</p>}

          <button type="submit" disabled={isPending} className={styles.submit}>
            {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className={styles.footer}>
          ยังไม่มีบัญชี? <Link href="/register">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}