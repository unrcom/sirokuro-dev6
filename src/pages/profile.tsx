import type { NextPage } from "next";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import useStore from "../store";
import { useQueryProfile } from "../hooks/useQueryProfile";
import { useMutateProfile } from "../hooks/useMutateProfile";
import { useDownloadUrl } from "../hooks/useDownloadUrl";
import { useUploadAvatarImg } from "../hooks/useUploadAvatarImg";
import { Spinner } from "../components/Spinner";
import { Layout } from "../components/Layout";

const Profile: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedProfile = useStore((state) => state.editedProfile);
  const update = useStore((state) => state.updateEditedProfile);
  const { data: profile } = useQueryProfile();
  const { updateProfileMutation } = useMutateProfile();

  const avatarUrl = "reactQuery.png";
  //   const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  //   const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
  //     editedProfile.avatar_url,
  //     "avatars"
  //   );
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      avatar_url: editedProfile.avatar_url,
      contact_madd: editedProfile.contact_madd,
      year_of_birth: editedProfile.year_of_birth,
      zip: editedProfile.zip,
      job: editedProfile.job,
      facebook: editedProfile.facebook,
      twitter: editedProfile.twitter,
      homepage: editedProfile.homepage,
      blog: editedProfile.blog,
      gender: editedProfile.gender,
    });
  };
  return (
    <>
      <Layout title="sirokuro.site">
        <p className="mb-4">{profile?.username}</p>
        {profile?.created_at && (
          <p className="my-1 text-sm">
            {format(new Date(profile.created_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {profile?.updated_at && (
          <p className="text-sm">
            {format(new Date(profile.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        <p className="mt-4">Username</p>
        <input
          className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          type="text"
          placeholder="Username"
          value={editedProfile.username || ""}
          onChange={(e) =>
            update({ ...editedProfile, username: e.target.value })
          }
        />
        <p>生まれ年（西暦）</p>
        <input
          className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          type="text"
          value={editedProfile.birth_year || ""}
          onChange={(e) =>
            update({ ...editedProfile, birth_year: e.target.value })
          }
        />
        <p>自宅の郵便番号</p>
        <input
          className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          type="text"
          value={editedProfile.zip || ""}
          onChange={(e) => update({ ...editedProfile, zip: e.target.value })}
        />
        <p>性別</p>
        <input
          className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          type="text"
          value={editedProfile.gender || ""}
          onChange={(e) => update({ ...editedProfile, gender: e.target.value })}
        />
        <p>ご職業</p>
        <input
          className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          type="text"
          value={editedProfile.occupantion || ""}
          onChange={(e) =>
            update({ ...editedProfile, occupantion: e.target.value })
          }
        />
        <button
          className={`my-5 rounded ${
            updateProfileMutation.isLoading || !editedProfile.username
              ? "bg-gray-400"
              : "bg-indigo-600"
          } px-3 py-2 text-sm font-medium text-white`}
          onClick={updateProfile}
          disabled={updateProfileMutation.isLoading || !editedProfile.username}
        >
          {updateProfileMutation.isLoading ? "Loading ..." : "Update"}
        </button>
        {/* {avatarUrl && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full"
          width={150}
          height={150}
        />
      )}
      {isLoading && <Spinner />}
      <div className="flex justify-center">
        <label htmlFor="avatar">
          <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
        />
      </div> */}
      </Layout>
    </>
  );
};

export default Profile;
