import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, FormEvent, FC, useEffect } from "react";
import { ShieldCheckIcon } from "@heroicons/react/solid";
import { Layout } from "../components/Layout";

import { useMutateAuth } from "../hooks/useMutateAuth";
import { supabase } from "../utils/supabase";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import styles from "./auth.module.css";

const Auth: NextPage = () => {
  const dev = true;
  // const dev = false;

  const user = supabase.auth.user();
  const { push, pathname } = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate();
    } else {
      registerMutation.mutate();
    }
  };

  // const validateSession = async () => {
  //   const user = supabase.auth.user();
  //   if (dev) {
  //     console.log(user);
  //     if (user) {
  //       console.log(user.id);
  //       console.log(user.email);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   validateSession();
  // }, []);

  const signOut = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signOut();
    // await validateSession();
  };

  return (
    <>
      {user ? (
        <Layout title="Auth">
          <form onSubmit={signOut}>
            <button type="submit" className={styles.SubmitButton}>
              ログアウト
            </button>
          </form>
        </Layout>
      ) : (
        <Layout title="Auth">
          <form onSubmit={handleSubmit} className={styles.auth__root}>
            <Typography align="center" variant="h5">
              {isLogin ? "ログイン" : "ユーザ登録"}
            </Typography>
            <Box
              sx={{
                width: 360,
                maxWidth: "100%",
              }}
            >
              <TextField
                required
                fullWidth
                id="email-input"
                label="Email"
                className={styles.EmailInput}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                required
                fullWidth
                id="password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                className={styles.EmailInput}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>
            <button type="submit" className={styles.SubmitButton}>
              {isLogin ? "ログイン" : "ユーザ登録"}
            </button>
            <div className={styles.LoginMode}>
              <span
                onClick={() => setIsLogin(!isLogin)}
                className={styles.Text}
              >
                {isLogin ? "ユーザ登録ですか？" : "ログインですか？"}
              </span>
            </div>
          </form>
        </Layout>
      )}
    </>
  );
};

export default Auth;
