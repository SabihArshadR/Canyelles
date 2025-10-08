"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Stone from "@/assets/icon_solar_system.png";
import Magma from "@/assets/icon_galaxy.png";
import Volcano from "@/assets/icon_planet.png";
import CheckIcon from "@/assets/check.svg";
import CustomButton from "../ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import api from "@/lib/axios";

const Progress = () => {
  const { user, refreshUser } = useUser();
  const [activeTab, setActiveTab] = useState<"progress" | "nivell">("progress");
  const [showPopup, setShowPopup] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const t = useTranslations("Progress");
  const t2 = useTranslations("Level");
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

  const totalPOIs = 3;

  const calculateCompleted = () => {
    const totalCompleted = user?.POIsCompleted || 0;
    const currentLevel = user?.currentLevel || 1;
    if (totalCompleted === 0) return 0;
    const poisForPreviousLevels = (currentLevel - 1) * totalPOIs;
    if (totalCompleted >= currentLevel * totalPOIs) {
      return totalPOIs;
    }
    return totalCompleted - poisForPreviousLevels;
  };

  const completed = calculateCompleted();
  const percentage = Math.max(0, Math.min((completed / totalPOIs) * 100, 100));

  const getLevelCompleted = (level: number) => {
    const totalCompleted = user?.POIsCompleted || 0;
    return totalCompleted >= level * totalPOIs;
  };

  const shouldShowOpacity = (level: number) => {
    const levelsToUnlock = level - 1;
    const poisRequiredToUnlock = levelsToUnlock * totalPOIs;
    return (user?.POIsCompleted || 0) >= poisRequiredToUnlock;
  };

  const getLevelName = () => {
    if (user?.currentLevel === 1) return t2("row2");
    if (user?.currentLevel === 2) return t2("row3");
    return t2("row1");
  };

  const getLevelIcon = () => {
    if (user?.currentLevel === 1) return Magma;
    if (user?.currentLevel === 2) return Stone;
    return Volcano;
  };

  const handleResetProgress = async () => {
    try {
      setLoadingReset(true);
      try {
        await api.patch("/user/restart");
        await refreshUser();
        await setShowPopup(false);
        router.push("/");
      } catch (err: any) {
        console.error("Error resetting progress:", err.response?.data || err.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h1 className="text-[22px] font-semibold text-darkblue mt-10">
        {t("title1")} {user?.firstName}
      </h1>

      <div>
        <Image src={getLevelIcon()} alt="Level Icon" width={96} height={96} />
      </div>

      <h1 className="text-2xl font-bold text-darkblue mt-[2px]">
        {getLevelName()}
      </h1>

      <h1 className="text-2xl font-bold text-lightgreen mt-3 font-gluten">
        {user?.points.toString()} {t("title3")}
      </h1>

      <div className="mt-[30px] flex w-full justify-center">
        <CustomButton
          onClick={() => setActiveTab("progress")}
          className={`rounded-none w-full bg-torquoise ${activeTab === "progress" ? "" : "bg-transparentt"} `}
        >
          {t("button1")}
        </CustomButton>
        <CustomButton
          onClick={() => setActiveTab("nivell")}
          className={`rounded-none w-full bg-torquoise ${activeTab === "nivell" ? "" : "bg-transparentt"} `}
        >
          {t2("button")}
        </CustomButton>
      </div>

      {activeTab === "progress" ? (
        <div className="bg-lightblue w-full flex flex-col items-center justify-center pb-10">
          <div className="mt-7">
            <div className="relative w-[196px] h-[196px]">
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(#8C9B2A ${percentage * 3.6}deg, #DDDDDD 0deg)`,
                }}
              >
                <div className="w-[176px] h-[176px] bg-white rounded-full flex items-center justify-center">
                  <Image
                    src={getLevelIcon()}
                    alt="score"
                    className="w-[68px] h-[68px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[17px] w-full px-4 pb-5">
            <CustomButton onClick={() => router.push("/amics")} className="w-full">
              {t("button2")}
            </CustomButton>
          </div>
          <div className="w-full mb-4 px-4 pb-5">
            <CustomButton className="w-full !bg-red-700" onClick={() => setShowPopup(true)}>
              {t("button3")}
            </CustomButton>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col bg-white min-h-[46vh]">
          <div className={`flex items-center justify-between border-b py-3 px-6 ${shouldShowOpacity(3) ? "" : "opacity-50"}`}>
            <div className="flex items-center gap-4">
              <Image src={Volcano} alt="Volcano" width={72} />
              <div>
                <h2 className="text-darkblue text-[24px] font-bold">{t2("row1")}</h2>
              </div>
            </div>
            {getLevelCompleted(3) && <Image src={CheckIcon} alt="Completed" />}
          </div>

          <div className={`flex items-center justify-between border-b py-3 px-6 ${shouldShowOpacity(2) ? "" : "opacity-50"}`}>
            <div className="flex items-center gap-4">
              <Image src={Stone} alt="Stone" width={72} />
              <div>
                <h2 className="text-darkblue text-[24px] font-bold">{t2("row3")}</h2>
              </div>
            </div>
            {getLevelCompleted(2) && <Image src={CheckIcon} alt="Completed" />}
          </div>

          <div className={`flex items-center justify-between border-b py-3 px-6 ${shouldShowOpacity(1) ? "" : "opacity-50"}`}>
            <div className="flex items-center gap-4">
              <Image src={Magma} alt="Magma" width={72} />
              <div>
                <h2 className="text-darkblue text-[24px] font-bold">{t2("row2")}</h2>
              </div>
            </div>
            {getLevelCompleted(1) && <Image src={CheckIcon} alt="Completed" />}
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 p-2 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#F5F3ED] rounded-2xl shadow-2xl p-6 w-95">
            <p className="text-lg text-center mb-6">{t("confirmMessage")}</p>
            <div className="flex gap-4">
              <CustomButton
                className="w-full"
                onClick={() => setShowPopup(false)}
              >
                {t("cancel")}
              </CustomButton>
              <CustomButton
                className="w-full !bg-red-700"
                onClick={handleResetProgress}
                disabled={loadingReset}
              >
                {t("confirm")}
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;