// app/register/page.tsx
"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";
import Link from "next/link";
import styles from "@/components/AuthForm.module.css";

const initialState = { error: "" };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>สมัครสมาชิก</h1>

        <form action={formAction}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>ชื่อ</label>
            <input id="name" name="name" type="text" required className={styles.input} />
          </div>

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
            {isPending ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <p className={styles.footer}>
          มีบัญชีแล้ว? <Link href="/login">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}