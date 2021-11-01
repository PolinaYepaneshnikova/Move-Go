import React from "react";
import AppTabs from "../appTabs/appTabs";
import AppUpHeader from "../appUpHeader/appUpHeader";

const HomePage = () => {
  return (
    <>
      <AppUpHeader />
      <main>
        <AppTabs />
      </main>
    </>
  );
}

export default HomePage;