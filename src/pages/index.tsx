import type { NextPage } from "next";
import Head from "next/head";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useQueryPostsNow } from "../hooks/useQueryPostsNow";
import { useDownloadUrl } from "../hooks/useDownloadUrl";
import { Appdrawer } from "../components/Appdrawer";
import { Footer } from "../components/Footer";
import { Banner } from "../components/Banner";

import useStore from "../store";

import styles from "./sirokuro.module.css";

const Home: NextPage = () => {
  const session = useStore((state) => state.session);
  const editedPost = useStore((state) => state.editedPost);
  const { fullUrl: postImgUrl_rtn, isLoading } = useDownloadUrl(
    editedPost.image_url,
    "posts"
  );
  const { data: posts } = useQueryPostsNow();
  console.log(posts);

  return (
    <>
      <Head>
        <title>sirokuro.site</title>
      </Head>
      <header></header>
      <Appdrawer />
      <div className={styles.container}>
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
          }}
          loop={true}
          // loopAdditionalSlides={1}
          speed={500}
        >
          {/* {items.map((banneritem, index) => { */}
          {posts?.map((post) => {
            return (
              <SwiperSlide key={post.id}>
                <Banner post={post} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {!session && <p>ログインしてください。</p>}
      <Footer />
    </>
  );
};

export default Home;
