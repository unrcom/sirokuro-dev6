import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "../styles/globals.css";

import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { supabase } from "../utils/supabase";

import useStore from "../store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // suspense: true,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const dev = true;
  // const dev = false;

  const { push, pathname } = useRouter();

  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);

  const validateSession = async () => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      console.log(event);
      if (event === "SIGNED_IN" && pathname === "/auth") {
        push("/");
      }
      if (event === "SIGNED_OUT" && pathname === "/auth") {
        push("/auth");
      }
    });

    // const session = supabase.auth.session();

    // if (dev) {
    //   console.log(session);
    //   if (session) {
    //     if (session.user) {
    //       console.log(session.user.id);
    //       console.log(session.user.email);
    //     }
    //   }
    // }
  };

  useEffect(() => {
    validateSession();
  }, []);

  // setSession(supabase.auth.session());

  // supabase.auth.onAuthStateChange((event, session) => {
  //   setSession(session);
  //   console.log(event);
  //   validateSession();
  //   if (event === "SIGNED_IN" && pathname === "/auth") {
  //     push("/");
  //   }
  //   if (event === "SIGNED_OUT" && pathname === "/auth") {
  //     push("/auth");
  //   }
  // });

  // const validateSession = async () => {
  //   const user = supabase.auth.user();
  //   if (user && pathname === "/") {
  //     push("/");
  //     // } else if (!user && pathname !== '/new') {
  //     //   await push('/auth')
  //   }
  // };

  // useEffect(() => {
  //   validateSession();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
