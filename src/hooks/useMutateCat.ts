import { useQueryClient, useMutation } from "react-query";
import { supabase } from "../utils/supabase";
import { Cat } from "../types";

export const useMutateCat = () => {
  const queryClient = useQueryClient();
  const createCatMutation = useMutation(
    async (
      cat: Omit<
        Cat,
        | "id"
        | "updated_at"
        | "created_at"
        | "post_cnt"
        | "com_cnt"
        | "reply_cnt"
      >
    ) => {
      const { data, error } = await supabase.from("cats").insert(cat);
      if (error) {
        if (error.message.indexOf("cats_name__constraint") > -1) {
          alert("指定のカテゴリー名はすでに登録されています。");
        } else {
          throw new Error(error.message);
        }
      }
      return data;
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );
  const updateCatMutation = useMutation(
    async (
      cat: Omit<
        Cat,
        | "updated_at"
        | "created_at"
        | "user_id"
        | "post_cnt"
        | "com_cnt"
        | "reply_cnt"
      >
    ) => {
      const { data, error } = await supabase
        .from("cats")
        .update(cat)
        .eq("id", cat.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(["cat"], res[0]);
      },
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );
  const deleteCatMutation = useMutation(
    async (
      cat: Omit<
        Cat,
        | "created_at"
        | "updated_at"
        | "name"
        | "post_cnt"
        | "com_cnt"
        | "reply_cnt"
      >
    ) => {
      const { data, error } = await supabase
        .from("cats")
        .delete()
        .eq("id", cat.id)
        .eq("user_id", cat.user_id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      // onSuccess: () => {
      //   reset();
      // },
      onError: (err: any) => {
        alert(err.message);
        // reset();
      },
    }
  );

  return { createCatMutation, updateCatMutation, deleteCatMutation };
};
