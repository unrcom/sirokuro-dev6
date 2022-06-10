import type { NextPage } from "next";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="sirokuro.site">
      {/* <div className="text-center">Welcome to sirokuro.site</div> */}
      <div className="title">Welcome to sirokuro.site</div>
      {/* <div>Welcome to sirokuro.site</div> */}
    </Layout>
  );
};

export default Home;
