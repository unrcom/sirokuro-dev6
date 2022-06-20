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
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(_event);
      if (_event === "SIGNED_IN" && pathname === "/auth") {
        push("/");
      }
      if (_event === "SIGNED_OUT" && pathname === "/auth") {
        push("/auth");
      }
    });
  }, [setSession]);

  if (session) {
    if (dev) {
      console.log(session);
      if (session.user) {
        console.log(session.user.id);
        console.log(session.user.email);
      }
    }
  } else {
    setSession(supabase.auth.session());
    if (session) {
      if (dev) {
        console.log(session);
        if (session.user) {
          console.log(session.user.id);
          console.log(session.user.email);
        }
      }
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
