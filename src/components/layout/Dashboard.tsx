"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Map from "@/assets/icon_files.png";
import Profile from "@/assets/icon_profile.png";
import Amics from "@/assets/icon_bag.png";
import Axe from "@/assets/icon_map.png";
import Faq from "@/assets/icon_faq.png";
import Direction from "@/assets/icon_city_hall.png";
// import Logo from "@/assets/tactica.jpg";
import Logo from "@/assets/render01.jpg";
import Card from "../ui/Card";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import SplashPopUp from "./Popup";
import Welcome from "./Welcome";
import Intro from "./Intro";
import api from "@/lib/axios";
import { useUser } from "@/context/UserContext";
import CompletePopup from "./CompletePopup";

const Dashboard = () => {
  const { user, refreshUser } = useUser();
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [loading, setLoading] = useState(false);
  const [ShowMorePopup, setShowMorePopup] = useState(false);
  const [ShowCompletePopup, setShowCompletePopup] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setLoading(true);
      const timer = setTimeout(() => {
        localStorage.setItem("hasSeenWelcome", "true");
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkIntro = async () => {
      if (user && user.hasSeenPopup === false) {
        setShowIntro(true);
      }
    };
    const checkPOI = async () => {
      if (user && user.POIsCompleted === 9) {
        setShowCompletePopup(true);
      }
    };
    checkIntro();
    checkPOI();
  }, [user]);


  const updateIntroStatus = async () => {
    try {
      await api.post("/user", {
        hasSeenPopup: true,
      });
    } catch (err: any) {
      console.error("Failed to update:", err.response?.data || err.message);
    }
  };

  if (loading) return (<Welcome />);

  return (
    <>
      {ShowMorePopup && <SplashPopUp handleClose={() => { setShowMorePopup(false); }} />}
      {ShowCompletePopup && <CompletePopup handleClose={() => { setShowCompletePopup(false); }} />}
      {showIntro && <Intro handleClose={() => {
        setShowIntro(false);
        updateIntroStatus();
      }} />}
      <div className="pb-[63px]"
      style={{ backgroundImage: "url('/LOGO.jpg')"}}
      >
        <div className="">
          <Image
            src={Logo}
            alt="Logo"
            className="object-cover h-[329px] w-[530px] object-[50%_36%]"
          />
        </div>
        <div className="flex justify-between mt-[33px] px-4 gap-4 font-gluten">
          <Card
            onClick={() => {
              if (user && user.POIsCompleted === 9) setShowCompletePopup(true);
              else router.push("/mapa");
            }}
          >
            <Image src={Map} alt="Map Icon" />
            <h1 className="text-center w-full break-words px-1 text-sm leading-4 font-semibold text-darkblue">
              {t("card1")}
            </h1>
            {status === "authenticated" && <div className="w-[15px] h-[15px] rounded-full bg-red-600 absolute top-2 right-2  animate-pulse"></div>}
          </Card>
          <Card
            onClick={() => {
              router.push("/progres");
            }}
          >
            <Image src={Profile} alt="Profile Icon" />
            <h1 className="text-center w-full break-words px-1 text-sm leading-4 font-semibold text-darkblue">
              {t("card2")}
            </h1>
          </Card>
          <Card
            onClick={() => {
              router.push("/amics");
            }}
          >
            <Image src={Amics} alt="Friends Icon" />
            <h1 className="text-center w-full break-words px-1 text-sm leading-4 font-semibold text-darkblue">
              {t("card3")}
            </h1>
            {status === "authenticated" && <div className="w-[15px] h-[15px] rounded-full bg-red-600 absolute top-2 right-2  animate-pulse"></div>}
          </Card>
        </div>
        <div className="flex justify-between mt-5 px-4 gap-4 font-gluten">
          <Card onClick={() => { setShowMorePopup(true); }}>
            <Image src={Axe} alt="Know More Icon" />
            <h1 className="text-center w-full break-words px-1 text-sm leading-4 font-semibold text-darkblue">
              {t("card4")}
            </h1>
          </Card>
          <Card
            onClick={() => {
              router.push("/faqs");
            }}
          >
            <Image src={Faq} alt="FAQs Icon" />
            <h1 className="text-center w-full break-words px-1 text-sm leading-4 font-semibold text-darkblue">
              {t("card5")}
            </h1>
          </Card>
          <Card onClick={() => {
            window.open("/Recomanem/infografia-amics-cinglera.pdf", "_blank");
          }}>
            <Image src={Direction} alt="Recommendations Icon" />
            <h1 className="text-center w-full break-words px-1 text-sm leading-4 font-semibold text-darkblue">
              {t("card6")}
            </h1>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
