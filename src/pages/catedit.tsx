import { useState, FormEvent, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { format } from "date-fns";
import { useQueryCat } from "../hooks/useQueryCat";
import { useQueryCats } from "../hooks/useQueryCats";
import { useMutateCat } from "../hooks/useMutateCat";
import { Spinner } from "../components/Spinner";
import { Appdrawer } from "../components/Appdrawer";
import { Footer } from "../components/Footer";

import styles from "./catedit.module.css";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useStore from "../store";
import { Cat } from "../types";

const Catedit: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedCat = useStore((state) => state.editedCat);
  const update = useStore((state) => state.updateEditedCat);
  // const { data: cat } = useQueryCat();
  const { updateCatMutation, createCatMutation, deleteCatMutation } =
    useMutateCat();
  const { data: cats, isLoading: isLoadingCats } = useQueryCats();
  let cats_current = cats;

  const [updateId, setUpdateId] = useState<string>("");
  const [insertCatName, setInsertCatName] = useState<string>("");
  const [updateCatName, setUpdateCatName] = useState<string>("");
  const [catCnt, setCatCnt] = useState<number>(0);
  const [catUmu, setCatUmu] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    cats_current = cats;
    if (cats_current) {
      setCatCnt(cats_current.length);
    } else {
      setCatCnt(0);
    }
    if (catCnt === 0) {
      setCatUmu(false);
    } else {
      setCatUmu(true);
    }
    // console.log(cats);
    // console.log(catCnt);
    // console.log(catUmu);
    // console.log(isLoadingCats);
  }, [isLoadingCats, catCnt, catUmu]);

  const submitCreateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(insertCatName);
    if (session) {
      if (session.user) {
        if (session.user.id) {
          if (insertCatName === "") {
            alert("????????????????????????????????????????????????");
          } else {
            let rtn;
            let cat_edited: Cat;
            rtn = await createCatMutation.mutateAsync({
              user_id: session?.user?.id,
              name: insertCatName,
            });
            console.log(rtn);
            if (rtn !== null) {
              cat_edited = {
                id: rtn[0].id,
                created_at: rtn[0].created_at,
                updated_at: rtn[0].updateed_at,
                user_id: rtn[0].user_id,
                name: rtn[0].name,
                post_cnt: rtn[0].post_cnt,
                com_cnt: rtn[0].com_cnt,
                reply_cnt: rtn[0].reply_cnt,
              };
              cats_current?.unshift(cat_edited);
              setCatCnt(catCnt + 1);
            }
          }
        }
      }
    }
  };

  const submitUpdateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updateCatName);
    if (session) {
      if (session.user) {
        if (session.user.id) {
          if (updateCatName === "") {
            alert("????????????????????????????????????????????????");
          } else {
            updateCatMutation.mutate({
              id: updateId,
              name: updateCatName,
            });
            let cats_current_pos = cats_current?.find(
              (unr) => unr.id === updateId
            );
            if (cats_current_pos) {
              cats_current_pos.name = updateCatName;
            }
          }
        }
      }
    }
  };

  const catItemHandleChange = (cat: Cat) => {
    if (cat.name) {
      setUpdateCatName(cat.name);
      setUpdateId(cat.id);
      setEditMode(true);
    }
  };

  const catDeleteHandleChange = async () => {
    if (session) {
      if (session.user) {
        if (session.user.id) {
          deleteCatMutation.mutate({
            id: updateId,
            user_id: session.user.id,
          });
          let index = cats_current?.findIndex((cat) => cat.id == updateId);
          // console.log(id);
          // console.log(index);
          if (typeof index === "number") {
            // console.log(index);
            cats_current?.splice(index, 1);
          }
          setUpdateCatName("");
          setUpdateId("");
          setEditMode(false);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>?????????????????????</title>
      </Head>
      <header></header>
      <Appdrawer />
      <div className={styles.root}>
        <form onSubmit={submitCreateHandler} className={styles.root2}>
          {session && (
            <input
              className={
                styles.my_2__mx_2__rounded__border__border_gray_300__px_3__py_2__text_sm__focus_outline_none
              }
              type="text"
              placeholder="????????????????????????"
              value={insertCatName || ""}
              onChange={(e) => {
                if (e.target.value.length <= 16) {
                  setInsertCatName(e.target.value);
                } else {
                  alert("?????????????????????1?????????????????????????????????????????????");
                }
              }}
            />
          )}
          {session && (
            <button
              className={
                styles.my_5__rounded__bg_indigo_600__px_3__py_2__text_sm__font_medium__text_white
              }
              // disabled={insertCatName.length <= 0}
            >
              ????????????????????????
            </button>
          )}
        </form>
        <div
          className={
            styles.my_3__w_full__border__border_dashed__border_gray_400
          }
        />
        {session && !catUmu && (
          <Typography align="left" variant="body1" className={styles.Orange}>
            ????????????????????????????????????????????????
          </Typography>
        )}
        {session && catUmu && (
          <Typography align="left" variant="body1" className={styles.Orange}>
            ??????????????????????????????
          </Typography>
        )}
        {session && catUmu && (
          <ul>
            {cats_current?.map((cat) => (
              <li className="w-80" key={cat.id}>
                {cat.post_cnt && (
                  <Button variant="text" className={styles.disable_btn}>
                    {cat.name} (????????????)
                  </Button>
                )}
                {!cat.post_cnt && (
                  <Button
                    variant="text"
                    className={styles.enable_btn}
                    onClick={() => catItemHandleChange(cat)}
                  >
                    {cat.name} (????????????)
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
        <div
          className={
            styles.my_3__w_full__border__border_dashed__border_gray_400
          }
        />
        <form onSubmit={submitUpdateHandler} className={styles.root2}>
          {session && editMode && (
            <input
              className={
                styles.my_2__mx_2__rounded__border__border_gray_300__px_3__py_2__text_sm__focus_outline_none
              }
              type="text"
              placeholder="????????????????????????"
              value={updateCatName || ""}
              onChange={(e) => {
                if (e.target.value.length <= 16) {
                  setUpdateCatName(e.target.value);
                } else {
                  alert("?????????????????????1?????????????????????????????????????????????");
                }
              }}
            />
          )}
          {session && editMode && (
            <button
              className={
                styles.my_5__rounded__bg_indigo_600__px_3__py_2__text_sm__font_medium__text_white
              }
              disabled={updateCatMutation.isLoading}
            >
              ????????????????????????
            </button>
          )}
          <Box sx={{ m: 1 }} />
          {session && editMode && (
            <Button
              variant="text"
              className={styles.mouse_pointer}
              onClick={() => catDeleteHandleChange()}
            >
              ?????????????????????????????????????????????
            </Button>
          )}
        </form>
        {/* {session && cat?.created_at && (
          <p className={styles.my_1__text_sm}>
            ??????????????????:{" "}
            {format(new Date(cat.created_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )}
        {session && cat?.updated_at && (
          <p className={styles.text_sm}>
            ??????????????????:{" "}
            {format(new Date(cat.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        )} */}

        {!session && <p>?????????????????????????????????</p>}
      </div>
      <Footer />
    </>
  );
};

export default Catedit;
