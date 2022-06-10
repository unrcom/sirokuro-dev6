import create from "zustand";
import { User } from "@supabase/supabase-js";
import { EditedProfile } from "../types";

type State = {
  user: User | null;
  setUser: (payload: User | null) => void;
  editedProfile: EditedProfile;
  updateEditedProfile: (payload: EditedProfile) => void;
  resetEditedProfile: () => void;
};
const useStore = create<State>((set) => ({
  user: null,
  setUser: (payload) => set({ user: payload }),
  editedProfile: {
    username: "",
    avatar_url: "",
    // plan: "",
    contact_madd: "",
    year_of_birth: "",
    zip: "",
    job: "",
    facebook: "",
    twitter: "",
    homepage: "",
    blog: "",
    gender: "",
  },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
        contact_madd: payload.contact_madd,
        year_of_birth: payload.year_of_birth,
        zip: payload.zip,
        job: payload.job,
        facebook: payload.facebook,
        twitter: payload.twitter,
        homepage: payload.homepage,
        blog: payload.blog,
        gender: payload.gender,
      },
    }),
  resetEditedProfile: () =>
    set({
      editedProfile: {
        username: "",
        avatar_url: "",
        // plan: "",
        contact_madd: "",
        year_of_birth: "",
        zip: "",
        job: "",
        facebook: "",
        twitter: "",
        homepage: "",
        blog: "",
        gender: "",
      },
    }),
}));

export default useStore;
