import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  console.log({ token });

  //   useEffect(() => {
  //     if (!token) {
  //       return;
  //     }

  //     if (token === "EXPIRED") {
  //       submit(null, { action: "/logout", method: "post" });
  //       return;
  //     }

  //     const remainingDuration = getTokenDuration();

  //     // timeout in 1hr
  //     setTimeout(() => {
  //       submit(null, { action: "/logout", method: "post" });
  //     }, remainingDuration);
  //   }, [submit, token]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
