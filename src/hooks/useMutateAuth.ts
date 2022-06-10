import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useMutation } from "react-query";

export const useMutateAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        if (err.message === "Invalid login credentials") {
          alert("指定のメールアドレスとパスワードの組み合わせは存在しません。");
        } else {
          alert(err.message);
          reset();
        }
      },
    }
  );

  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        if (err.message === "Password should be at least 6 characters") {
          alert("パスワードは６文字以上を指定してください。");
        } else if (
          err.message === "Unable to validate email address: invalid format"
        ) {
          alert("メールアドレスの書式に誤りがあります。");
        } else {
          alert(err.message);
          reset();
        }
      },
    }
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  };
};
