import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import useStore from "../store";
import { Profile } from "../types/";
import { useMutateProfile } from "../hooks/useMutateProfile";

export const useQueryProfile = () => {
  const session = useStore((state) => state.session);
  const editedProfile = useStore((state) => state.editedProfile);
  const update = useStore((state) => state.updateEditedProfile);
  const { createProfileMutation } = useMutateProfile();
  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user?.id)
      .single();
    if (error && status === 406) {
      if (session?.user?.id) {
        createProfileMutation.mutate({
          id: session?.user?.id,
          username: "",
          avatar_url: "",
          contact_madd: "",
          year_of_birth: "",
          zip: "",
          job: "",
          facebook: "",
          twitter: "",
          homepage: "",
          blog: "",
          gender: "",
        });
        update({
          ...editedProfile,
        });
      }
    }
    if (error && status !== 406) {
      throw new Error(error.message);
    }
    return data;
  };
  return useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (data) {
        update({
          username: data.username,
          avatar_url: data.avatar_url,
          contact_madd: data.contact_madd,
          year_of_birth: data.year_of_birth,
          zip: data.zip,
          job: data.job,
          facebook: data.facebook,
          twitter: data.twitter,
          homepage: data.homepage,
          blog: data.blog,
          gender: data.gender,
        });
      }
    },
  });
};
