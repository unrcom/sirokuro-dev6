import { useRef, useState } from "react";
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

import styles from "./profile.module.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
    { key: "000", value: "家事、家族支援" },
    { key: "001", value: "放送関連" },
    { key: "002", value: "医療関連" },
    { key: "003", value: "美術・芸術関連" },
    { key: "004", value: "インテリア関連" },
    { key: "005", value: "飲食関係" },
    { key: "007", value: "ウェブ関連" },
    { key: "008", value: "接客関連" },
    { key: "009", value: "宇宙関連" },
    { key: "010", value: "占い関連" },
    { key: "011", value: "運転・運行関連" },
    { key: "012", value: "映画関連" },
    { key: "013", value: "栄養士" },
    { key: "014", value: "鉄道関連" },
    { key: "016", value: "技術関連" },
    { key: "017", value: "舞台関連" },
    { key: "018", value: "メイド" },
    { key: "019", value: "音楽関連" },
    { key: "020", value: "会計関連" },
    { key: "021", value: "評論関連" },
    { key: "022", value: "外交官" },
    { key: "023", value: "介護・福祉関連" },
    { key: "024", value: "害虫駆除関連" },
    { key: "025", value: "カウンセラー" },
    { key: "026", value: "科学者" },
    { key: "028", value: "学者" },
    { key: "029", value: "鍛冶屋" },
    { key: "031", value: "家政婦" },
    { key: "032", value: "教育関連" },
    { key: "033", value: "映像関連" },
    { key: "035", value: "看守" },
    { key: "036", value: "官僚" },
    { key: "037", value: "機械工" },
    { key: "039", value: "脚本家" },
    { key: "040", value: "騎手" },
    { key: "041", value: "気象予報士" },
    { key: "043", value: "救急救命士" },
    { key: "045", value: "銀行員" },
    { key: "046", value: "クリーニング店員" },
    { key: "047", value: "軍人" },
    { key: "048", value: "経営者" },
    { key: "049", value: "警察官" },
    { key: "050", value: "警備員、ガードマン" },
    { key: "051", value: "刑務官" },
    { key: "053", value: "法曹関連" },
    { key: "054", value: "建築関連" },
    { key: "055", value: "建築士、建築家" },
    { key: "056", value: "漁業関連" },
    { key: "058", value: "公務員" },
    { key: "059", value: "文筆関連" },
    { key: "060", value: "コンサルタント" },
    { key: "065", value: "オフィスワーカー" },
    { key: "068", value: "司書、図書館員" },
    { key: "069", value: "詩人" },
    { key: "070", value: "服飾関連" },
    { key: "071", value: "実業家" },
    { key: "072", value: "執事" },
    { key: "073", value: "事務員" },
    { key: "075", value: "社会保険労務士" },
    { key: "077", value: "修理工" },
    { key: "078", value: "消防士" },
    { key: "079", value: "書家、書道家" },
    { key: "080", value: "新聞記者" },
    { key: "081", value: "新聞配達員" },
    { key: "082", value: "審判" },
    { key: "083", value: "政治家" },
    { key: "084", value: "整備士" },
    { key: "085", value: "スタイリスト" },
    { key: "086", value: "声優" },
    { key: "087", value: "海運関連" },
    { key: "088", value: "速記士" },
    { key: "089", value: "税理士" },
    { key: "090", value: "測量士" },
    { key: "091", value: "葬儀関連" },
    { key: "093", value: "タクシー運転手" },
    { key: "094", value: "探検家" },
    { key: "095", value: "探偵" },
    { key: "096", value: "調教師" },
    { key: "098", value: "調律師" },
    { key: "099", value: "通訳" },
    { key: "101", value: "電気工" },
    { key: "102", value: "添乗員、ツアーコンダクター" },
    { key: "103", value: "登山家" },
    { key: "104", value: "床屋" },
    { key: "105", value: "ナレーター" },
    { key: "107", value: "園芸関連" },
    { key: "108", value: "農業関連" },
    { key: "109", value: "配管工" },
    { key: "110", value: "俳優" },
    { key: "111", value: "航空関連" },
    { key: "113", value: "観光関連" },
    { key: "114", value: "発明家" },
    { key: "115", value: "秘書" },
    { key: "116", value: "美容師" },
    { key: "118", value: "システム開発系" },
    { key: "119", value: "プロデューサー" },
    { key: "121", value: "編集者" },
    { key: "123", value: "保育士、保母" },
    { key: "124", value: "報道関連" },
    { key: "126", value: "翻訳家" },
    { key: "127", value: "漫画家" },
    { key: "128", value: "薬剤師" },
    { key: "129", value: "郵便関連" },
    { key: "131", value: "溶接工" },
    { key: "132", value: "酪農家" },
    { key: "135", value: "猟師" },
    { key: "998", value: "該当なし" },
    { key: "999", value: "答えたくない" },
  ];

  const yearHandleChange = (e) => {
    update({ ...editedProfile, year_of_birth: e.target.value });
  };

  const kenHandleChange = (e) => {
    update({ ...editedProfile, zip: e.target.value });
  };

  const genderHandleChange = (e) => {
    update({ ...editedProfile, gender: e.target.value });
  };

  const jobHandleChange = (e) => {
    update({ ...editedProfile, job: e.target.value });
  };

  return (
    <>
      <Layout title="sirokuro.site">
        <p className={styles.mb_4}>{profile?.username}</p>
        {profile?.created_at && (
          <p className={styles.my_1__text_sm}>
            {format(new Date(profile.created_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {profile?.updated_at && (
          <p className={styles.text_sm}>
            {format(new Date(profile.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        <p className={styles.mt_4}>ユーザ名</p>
        <input
          className={
            styles.my_2__mx_2__rounded__border__border_gray_300__px_3__py_2__text_sm__focus_outline_none
          }
          type="text"
          placeholder="Username"
          value={editedProfile.username || ""}
          onChange={(e) => {
            if (e.target.value.length <= 12) {
              update({ ...editedProfile, username: e.target.value });
            } else {
              alert("ユーザ名は1６文字以内で指定してください。");
            }
          }}
        />
        <p>生まれ年（西暦）</p>
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
        <p>ご自宅の都道府県</p>
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

        <p>性別</p>
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
        <p>ご職業</p>
        {/* <input
          className={
            styles.my_2__mx_2__rounded__border__border_gray_300__px_3__py_2__text_sm__focus_outline_none
          }
          type="text"
          value={editedProfile.job || ""}
          onChange={(e) => update({ ...editedProfile, job: e.target.value })}
        /> */}
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
          {updateProfileMutation.isLoading ? "Loading ..." : "Update"}
        </button>
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt="Avatar"
            className={styles.rounded_full}
            width={150}
            height={150}
          />
        )}
        {isLoading && <Spinner />}
        <div className={styles.flex__justify_center}>
          <label htmlFor="avatar">
            <CameraIcon
              className={styles.my_3__h_7__w_7_cursor_pointer__text_gray_500}
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
      </Layout>
    </>
  );
};

export default Profile;
