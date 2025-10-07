"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/icon.svg";
import User from "@/assets/Group 77.png";
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
    <div className="flex justify-between items-center w-full px-3 py-[32px]"
     style={{ backgroundImage: "url('/bgimage.png')" }}
    >
      <div className="mt-4 w-[70px]">
        <Menu />
        <h1 className="text-white text-base font-bold mt-3">
          {t("title1")}
        </h1>
      </div>

      <div className="">
        <div className="flex justify-center">

        <Image
          src={Logo}
          alt="Logo"
          width={108}
          height={68}
          className=" px-auto"
          onClick={() => router.push("/")}
          />
          </div>
        <h1 className="text-pink text-center font-gluten text-[30px] leading-[30px] font-bold mt-[5px] tracking-normal">{t("heading1")}</h1>
        <h2 className="text-[#FFDAC1] text-center font-gluten font-bold text-[11px]">{t("heading2")}</h2>
      </div>

      <div className="flex items-end flex-col mt-2 w-[70px]" onClick={handleAuthClick}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={status === "authenticated" ? User : User}
            alt={status === "authenticated" ? "Logout" : "User"}
          />
          <h1 className="text-white text-base font-bold text-center leading-6">
            {status === "authenticated" ? t("title3") : t("title2")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
