import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { useQueryProfile } from "../hooks/useQueryProfile";
import { useMutateProfile } from "../hooks/useMutateProfile";
import { useDownloadUrl } from "../hooks/useDownloadUrl";
import { useUploadAvatarImg } from "../hooks/useUploadAvatarImg";
import { Spinner } from "../components/Spinner";
import { Appdrawer } from "../components/Appdrawer";
import { Footer } from "../components/Footer";

import styles from "./profile.module.css";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";

import useStore from "../store";

const Profile: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedProfile = useStore((state) => state.editedProfile);
  const update = useStore((state) => state.updateEditedProfile);
  const { data: profile } = useQueryProfile();
  const { updateProfileMutation } = useMutateProfile();
  const { useMutateUploadAvatarImg } = useUploadAvatarImg();
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    "avatars"
  );
  console.log(avatarUrl);

  const updateProfile = () => {
    if (session) {
      if (session.user) {
        if (session.user.id) {
          if (editedProfile.username === "") {
            alert("ユーザ名を指定してください。");
          } else if (editedProfile.year_of_birth === "") {
            alert("お生まれになった西暦を指定してください。");
          } else if (editedProfile.zip === "") {
            alert("ご自宅の都道府県を指定してください。");
          } else if (editedProfile.gender === "") {
            alert("ご自身の性別を指定してください。");
          } else if (editedProfile.job === "") {
            alert("ご自身のご職業を指定してください。");
          } else {
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
          }
        }
      }
    }
  };

  const years = [];
  for (let i = 1921; i <= 2022; i++) {
    years.push(String(i));
  }

  const kens = [
    { key: "01", value: "北海道" },
    { key: "02", value: "青森" },
    { key: "03", value: "岩手" },
    { key: "04", value: "宮城" },
    { key: "05", value: "秋田" },
    { key: "06", value: "山形" },
    { key: "07", value: "福島" },
    { key: "08", value: "茨城" },
    { key: "09", value: "栃木" },
    { key: "10", value: "群馬" },
    { key: "11", value: "埼玉" },
    { key: "12", value: "千葉" },
    { key: "13", value: "東京" },
    { key: "14", value: "神奈川" },
    { key: "15", value: "新潟" },
    { key: "16", value: "富山" },
    { key: "17", value: "石川" },
    { key: "18", value: "福井" },
    { key: "19", value: "山梨" },
    { key: "20", value: "長野" },
    { key: "21", value: "岐阜" },
    { key: "22", value: "静岡" },
    { key: "23", value: "愛知" },
    { key: "24", value: "三重" },
    { key: "25", value: "滋賀" },
    { key: "26", value: "京都" },
    { key: "27", value: "大阪" },
    { key: "28", value: "兵庫" },
    { key: "29", value: "奈良" },
    { key: "30", value: "和歌山" },
    { key: "31", value: "鳥取" },
    { key: "32", value: "島根" },
    { key: "33", value: "岡山" },
    { key: "34", value: "広島" },
    { key: "35", value: "山口" },
    { key: "36", value: "徳島" },
    { key: "37", value: "香川" },
    { key: "38", value: "愛媛" },
    { key: "39", value: "高知" },
    { key: "40", value: "福岡" },
    { key: "41", value: "佐賀" },
    { key: "42", value: "長崎" },
    { key: "43", value: "熊本" },
    { key: "44", value: "大分" },
    { key: "45", value: "宮崎" },
    { key: "46", value: "鹿児島" },
    { key: "47", value: "沖縄" },
    { key: "99", value: "答えたくない" },
  ];

  const jobs = [
    { key: "000", value: "無職・お仕事検討中" },
    { key: "001", value: "無職・次のステージへの準備中" },
    { key: "002", value: "無職・趣味に専念中" },
    { key: "003", value: "無職・休養中" },
    { key: "004", value: "無職・リタイア中" },
    { key: "005", value: "無職・家族支援中" },
    { key: "006", value: "無職・育児中" },
    { key: "007", value: "無職・その他" },
    { key: "008", value: "ボランティア" },
    { key: "009", value: "学生" },
    { key: "020", value: "会社員" },
    { key: "021", value: "法人役員" },
    { key: "022", value: "法人顧問、相談役" },
    { key: "030", value: "個人事業主" },
    { key: "040", value: "アルバイト、パート" },
    { key: "050", value: "その他の従業員" },
    { key: "060", value: "公務員" },
    { key: "998", value: "該当なし" },
    { key: "999", value: "答えたくない" },
  ];

  const yearHandleChange = (e: SelectChangeEvent<string>) => {
    update({ ...editedProfile, year_of_birth: e.target.value });
  };

  const kenHandleChange = (e: SelectChangeEvent<string>) => {
    update({ ...editedProfile, zip: e.target.value });
  };

  const genderHandleChange = (e: SelectChangeEvent<string>) => {
    update({ ...editedProfile, gender: e.target.value });
  };

  const jobHandleChange = (e: SelectChangeEvent<string>) => {
    update({ ...editedProfile, job: e.target.value });
  };

  return (
    <>
      <Head>
        <title>プロフィール編集</title>
      </Head>
      <header></header>
      {/* <Layout title="好き嫌い投稿"> */}
      <Appdrawer />

      <div className={styles.container}>
        {session && profile?.created_at && (
          <p className={styles.my_1__text_sm}>
            初回登録日時:{" "}
            {format(new Date(profile.created_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {session && profile?.updated_at && (
          <p className={styles.text_sm}>
            最終更新日時:{" "}
            {format(new Date(profile.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {session && <p className={styles.mt_4}>ユーザ名</p>}
        {session && (
          <input
            className={
              styles.my_2__mx_2__rounded__border__border_gray_300__px_3__py_2__text_sm__focus_outline_none
            }
            type="text"
            placeholder="Username"
            value={editedProfile.username || ""}
            onChange={(e) => {
              if (e.target.value.length <= 16) {
                update({ ...editedProfile, username: e.target.value });
              } else {
                alert("ユーザ名は1６文字以内で指定してください。");
              }
            }}
          />
        )}
        {session && <p>生まれ年（西暦）</p>}
        {session && (
          <Select
            labelId="year-select-label"
            id="year-select"
            value={editedProfile.year_of_birth || ""}
            label=""
            onChange={(e) => yearHandleChange(e)}
          >
            <MenuItem key="1920" value="1920">
              1920年以前
            </MenuItem>
            {years.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
            <MenuItem key="9999" value="9999">
              答えたくない
            </MenuItem>
          </Select>
        )}
        {session && <p>ご自宅の都道府県</p>}
        {session && (
          <Select
            labelId="ken-select-label"
            id="ken-select"
            value={editedProfile.zip || ""}
            label=""
            onChange={(e) => kenHandleChange(e)}
          >
            {kens.map((obj) => (
              <MenuItem key={obj.key} value={obj.value}>
                {obj.value}
              </MenuItem>
            ))}
          </Select>
        )}
        {session && <p>性別</p>}
        {session && (
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={editedProfile.gender || ""}
            label=""
            onChange={(e) => genderHandleChange(e)}
          >
            <MenuItem key="M" value="男性">
              男性
            </MenuItem>
            <MenuItem key="F" value="女性">
              女性
            </MenuItem>
            <MenuItem key="N" value="答えたくない">
              答えたくない
            </MenuItem>
          </Select>
        )}
        {session && <p>ご職業</p>}
        {session && (
          <Select
            labelId="job-select-label"
            id="job-select"
            value={editedProfile.job || ""}
            label=""
            onChange={(e) => jobHandleChange(e)}
          >
            {jobs.map((obj) => (
              <MenuItem key={obj.key} value={obj.value}>
                {obj.value}
              </MenuItem>
            ))}
          </Select>
        )}
        {session && avatarUrl && (
          <Box>
            <Image
              src={avatarUrl}
              // src="0.5566105857482775.JPG"
              alt="Avatar"
              className={styles.rounded_full}
              width={150}
              height={150}
            />
          </Box>
        )}
        {isLoading && <Spinner />}
        {session && (
          <Box>
            <div className={styles.flex__justify_center}>
              <label htmlFor="avatar">
                <CameraIcon
                  className={
                    styles.my_3__h_7__w_7_cursor_pointer__text_gray_500
                  }
                />
              </label>
              <input
                className={styles.hidden}
                type="file"
                id="avatar"
                accept="image/*"
                onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
              />
            </div>
          </Box>
        )}
        {session && (
          <button
            className={
              styles.my_5__rounded__bg_indigo_600__px_3__py_2__text_sm__font_medium__text_white
            }
            // className={`my-5 rounded ${
            //   updateProfileMutation.isLoading || !editedProfile.username
            //     ? "bg-gray-400"
            //     : "bg-indigo-600"
            // } px-3 py-2 text-sm font-medium text-white`}
            onClick={updateProfile}
            disabled={updateProfileMutation.isLoading}
          >
            {updateProfileMutation.isLoading
              ? "Loading ..."
              : "プロフィール更新"}
          </button>
        )}
        {!session && <p>ログインしてください。</p>}
        <Footer />
      </div>
    </>
  );
};

export default Profile;
