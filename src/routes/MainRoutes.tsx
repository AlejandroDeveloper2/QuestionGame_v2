/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuthStore } from "@auth/hooks";
import { useLoading } from "@core/hooks";

import { AdminRoutes, PlayerRoutes, PublicRoutes } from ".";
import { LoadingWindow, Spinner } from "@core/components";

const MainRoutes = (): JSX.Element => {
  const { loading, toggleLoading } = useLoading();
  const { authStatus, refreshUserAuth } = useAuthStore();

  useEffect(() => {
    if (!location.pathname.includes("/game")) refreshUserAuth(toggleLoading);
  }, []);

  if (authStatus === "checking")
    return (
      <LoadingWindow
        opacity={!loading.isLoading ? 0 : 1}
        isLoading={loading.isLoading}
      >
        <Spinner
          message={loading.message}
          direction="column"
          color="var(--white)"
        />
      </LoadingWindow>
    );

  return (
    <BrowserRouter>
      <PlayerRoutes />
      <Routes>
        {authStatus === "not-authenticated" ? (
          <>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/admin/*" element={<Navigate to="/login" />} />
            <Route path="/admin/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<AdminRoutes />} />
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/login" element={<Navigate to="/admin" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
