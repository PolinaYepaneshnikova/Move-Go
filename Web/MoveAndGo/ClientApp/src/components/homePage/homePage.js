import React from "react";
import AddPage from "../addPage/addPage";
import AppTabs from "../appTabs/appTabs";
import AppUpHeader from "../appUpHeader/appUpHeader";

const HomePage = () => {
  return (
    <>
      <AppUpHeader />
      <main>
        <AppTabs />
        <AddPage />
      </main>
    </>
  );
}

export default HomePage;