"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/tactica 1 (2).jpg";
import CustomButton from "../ui/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Dyk = () => {
  const router = useRouter();
  const t = useTranslations("DidYouKnow");

  return (
    <div className="flex flex-col justify-center pb-[23px] bg-white">
      <div>
        <Image src={Logo} alt="Logo" className="w-[430px] h-[349px] object-cover"/>
      </div>

      <h1 className="text-darkblue mt-[25px] text-5xl font-semibold ml-[25px] font-gluten">
        {t("title")}
      </h1>
      <p className="text-darkblue px-[32px] mt-5 text-[16px]">
        {t("description")}
      </p>
      <div className="w-full px-[15px]">
        <CustomButton
          className="mt-10 w-full"
          onClick={() => {
            router.push("/quiz1");
          }}
        >
          {t("button")}
        </CustomButton>
      </div>
    </div>
  );
};

export default Dyk;
