import { useQueryClient, useMutation } from "react-query";
import { supabase } from "../utils/supabase";
import { Profile } from "../types";

export const useMutateProfile = () => {
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation(
    async (
      profile: Omit<
        Profile,
        "updated_at" | "created_at" | "plan" | "login_madd"
      >
    ) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id);
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(["profile"], res[0]);
      },
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );
  return { updateProfileMutation };
};
