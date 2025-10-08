"use client";
import Image from "next/image";
import React from "react";
import Map from "@/assets/mapa.png";
import CustomButton from "../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import Loading from "./Loading";

const stop = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
]

const Maps = () => {
  const { user } = useUser();
  const t = useTranslations("Map");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") { 
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!user) return <Loading />;

  const destination = stop[user?.POIsCompleted];

  return (
    <div className="pb-5 px-3.5 bg-lightblue min-h-[80vh]">
      <div className="flex justify-center">
        <Image src={Map} alt="Map" className="mt-[88px] w-[192px] h-[192px]" />
      </div>
      <h1 className="text-2xl font-bold text-center text-pink mt-[53px] font-gluten">
        {t(destination)} {t("title1")}
      </h1>
      {/* <h1 className="text-4xl font-medium text-center text-secondary mt-[10px] leading-8">
        {t("title2")}
      </h1> */}
      <div className="flex flex-col justify-center items-center mt-[14vh] font-gluten">
        <CustomButton
          onClick={() => {
            router.push("/mapp");
          }}
        >
          {t("button")}
        </CustomButton>
      </div>
    </div>
  );
};

export default Maps;
