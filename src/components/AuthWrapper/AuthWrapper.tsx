"use client";

import { useSession } from "next-auth/react";
import React from "react";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please log in to view your dashboard.
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
