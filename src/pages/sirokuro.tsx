import type { NextPage } from "next";
import Head from "next/head";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useQueryPostsNow } from "../hooks/useQueryPostsNow";
import { useQueryPostsFull } from "../hooks/useQueryPostsFull";
import { useDownloadUrl } from "../hooks/useDownloadUrl";
import { Appdrawer } from "../components/Appdrawer";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";

import useStore from "../store";
import { Post } from "../hooks/useQueryPost";

import styles from "./sirokuro.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Sirokuro: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const { fullUrl: postImgUrl_rtn, isLoading } = useDownloadUrl(
    editedPost.image_url,
    "posts"
  );
  const { data: posts } = useQueryPostsNow();
  const { data: posts_full } = useQueryPostsFull();
  console.log(posts_full);

  return (
    <>
      <Head>
        <title>sirokuroつける</title>
      </Head>
      <header></header>
      <Appdrawer />
      <div className={styles.container}>
        <ul data-testid="ul-post" className="my-5">
          {posts_full?.map((post_full) => {
            <li className="w-80" key={post_full.id}>
              <Button variant="text" className={styles.mouse_pointer}>
                {post_full.stitle}
              </Button>
            </li>;
          })}
        </ul>
      </div>
      <div className={styles.container}>
        <Box sx={{ m: 3 }} />
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            waitForTransition: false,
            stopOnLastSlide: true,
          }}
          // loop={true}
          // loopAdditionalSlides={1}
          speed={500}
        >
          {posts?.map((post) => {
            return (
              // <SwiperSlide key={post.id} className={styles.swiper_slide}>
              <SwiperSlide key={post.id}>
                <Banner post={post} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Box sx={{ m: 3 }} />
      <ul data-testid="ul-post" className="my-5">
        {posts_full?.map((post_full) => {
          <li className="w-80" key={post_full.id}>
            <Button variant="text" className={styles.mouse_pointer}>
              {post_full.stitle}
            </Button>
          </li>;
        })}
      </ul>

      {!session && <div>ログインしてください。</div>}
      <Footer />
    </>
  );
};

export default Sirokuro;
