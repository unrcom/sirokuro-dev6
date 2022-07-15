import { useState, FormEvent, FC, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { supabase } from "../utils/supabase";

import { useMutateAuth } from "../hooks/useMutateAuth";
import { Appdrawer } from "../components/Appdrawer";
import { Footer } from "../components/Footer";

import { ShieldCheckIcon } from "@heroicons/react/solid";

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
      <Head>
        <title>ユーザ認証</title>
      </Head>
      <header></header>
      <Appdrawer />
      <div className={styles.container}>
        {user ? (
          <form onSubmit={signOut} className={styles.auth__root}>
            <button type="submit" className={styles.SubmitButton}>
              ログアウト
            </button>
          </form>
        ) : (
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default Auth;
