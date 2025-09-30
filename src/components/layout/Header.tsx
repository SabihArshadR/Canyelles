"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo_EACB.png";
import User from "@/assets/user.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Menu from "../ui/Menu";
import { useSession, signOut } from "next-auth/react";
const Header = () => {
  const t = useTranslations("Head");
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleAuthClick = () => {
    if (status === "authenticated") {
      signOut({ callbackUrl: "/login" });
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-3">
      <div className="mt-4 w-[70px]">
        <Menu />
        <h1 className="text-secondary text-base font-bold mt-3">
          {t("title1")}
        </h1>
      </div>

      <div>
        <Image
          src={Logo}
          alt="Logo"
          width={176}
          height={148}
          className="py-5"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="flex items-end flex-col mt-2 w-[70px]" onClick={handleAuthClick}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={status === "authenticated" ? User : User}
            alt={status === "authenticated" ? "Logout" : "User"}
          />
          <h1 className="text-secondary text-base font-bold text-center leading-6">
            {status === "authenticated" ? t("title3") : t("title2")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
