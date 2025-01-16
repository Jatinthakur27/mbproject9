"use client";
import MyLoader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = () => {
  const { getUser, isLoading } = useKindeAuth();

  const user = getUser();

  if (isLoading) {
    return <MyLoader />;
  }

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-1/2 h-1/2 flex items-center justify-center space-x-8">
        <Button asChild>
          <LoginLink>Login</LoginLink>
        </Button>
        <Button asChild>
          <RegisterLink>Signup</RegisterLink>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
