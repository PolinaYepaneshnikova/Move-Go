import React from "react";
import AppTabs from "../appTabs/appTabs";
import AppUpHeader from "../appUpHeader/appUpHeader";

const HomePage = ({ data }) => {
  return (
    <>
      <AppUpHeader />
      <main>
        <AppTabs data={data} />
      </main>
    </>
  );
}

export default HomePage;