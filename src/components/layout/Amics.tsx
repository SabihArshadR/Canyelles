"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/UserContext";
import ModelViewer from "./ModelViewer";

// Findings images
// import finding1 from "@/assets/findings/1. clock tower.jpg";
// import finding2 from "@/assets/findings/2. rusty tools.jpg";
// import finding3 from "@/assets/findings/3. medieval sword.jpg";
// import finding4 from "@/assets/findings/4. basaltic rock.jpg";
// import finding5 from "@/assets/findings/5. chariot.jpg";
// import finding6 from "@/assets/findings/6. green frog.jpg";
// import finding7 from "@/assets/findings/7. willow.jpg";
// import finding8 from "@/assets/findings/8. eurasian.jpg";
// import finding9 from "@/assets/findings/9. trophy.jpg";

import finding1 from "@/assets/gem1.png";
import finding2 from "@/assets/gem2.png";
import finding3 from "@/assets/gem3.png";
import finding4 from "@/assets/gem4.png";
import finding5 from "@/assets/gem5.png";
import finding6 from "@/assets/gem6.png";
// import finding7 from "@/assets/findings/7. willow.jpg";
// import finding8 from "@/assets/findings/8. eurasian.jpg";
// import finding9 from "@/assets/findings/9. trophy.jpg";

interface Finding {
  img: StaticImageData;
  model: string;
  altKey: string;
  zoom: "moreless" | "less" | "normal" | "large";
}

const Amics = () => {
  const t = useTranslations("Amics");
  const router = useRouter();
  const { status } = useSession();
  const { user } = useUser();
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [activeModelZoom, setActiveModelZoom] = useState<string | null>(
    "normal"
  );
  const [isLoading, setIsLoading] = useState(true);

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXTAUTH_URL || "http://localhost:3000";
  };

  const HOST = getBaseUrl();

  const findings: Finding[] = [
    {
      img: finding1,
      model: `${HOST}/models/1_clock_tower.glb`,
      altKey: "finding1",
      zoom: "normal",
    },
    {
      img: finding2,
      model: `${HOST}/models/2_rusty_tools.glb`,
      altKey: "finding2",
      zoom: "normal",
    },
    {
      img: finding3,
      model: `${HOST}/models/3_medieval_sword.glb`,
      altKey: "finding3",
      zoom: "normal",
    },
    {
      img: finding4,
      model: `${HOST}/models/4_basaltic_rock.glb`,
      altKey: "finding4",
      zoom: "moreless",
    },
    {
      img: finding5,
      model: `${HOST}/models/5_chariot.glb`,
      altKey: "finding5",
      zoom: "normal",
    },
    {
      img: finding6,
      model: `${HOST}/models/6_green_frog.glb`,
      altKey: "finding6",
      zoom: "normal",
    },
    // { img: finding7, model: `${HOST}/models/7_willow.glb`, altKey: "finding7", zoom: "less" },
    // { img: finding8, model: `${HOST}/models/8_eurasian.glb`, altKey: "finding8", zoom: "large" },
    // { img: finding9, model: `${HOST}/models/9_trophy.glb`, altKey: "finding9", zoom: "normal" },
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (user) {
      setUnlockedCount(user.POIsCompleted);
    }
  }, [user]);

  const handleClick = (index: number) => {
    if (index < unlockedCount) {
      setActiveModel(findings[index].model);
      setActiveModelZoom(findings[index].zoom);
    }
  };

  
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightgreen"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex flex-col items-center h-[91vh] bg-white pb-10 md:pb-32">
      <div className="bg-pink w-full flex h-24 md:h-28 items-center justify-center font-gluten">
        <h1 className="text-2xl md:text-3xl font-semibold text-white text-center">
          {t("title")}
        </h1>
      </div>

      <div className="mt-8 w-full max-w-4xl pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-6 w-full px-5 md:px-0 justify-items-center">
          {findings.map((item, index) => {
            const isUnlocked = index < unlockedCount;
            return (
              <div
                className="w-[170px] h-[170px] rounded-[12px]"
                style={{
                  backgroundImage: "url(/bg.svg)",
                  backgroundSize: "cover",
                }}
              >
                <div
                  key={index}
                  className={`relative aspect-square transition-all duration-300 ${
                    !isUnlocked
                      ? "opacity-50"
                      : "hover:scale-105 cursor-pointer"
                  }`}
                >
                  <button
                    onClick={() => handleClick(index)}
                    disabled={!isUnlocked}
                    className="w-full h-full"
                  >
                    <Image
                      src={item.img}
                      alt="img"
                      className="object-cover w-[122px] h-[122px] mx-auto"
                      // fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ModelViewer
        modelPath={activeModel || ""}
        isOpen={!!activeModel}
        onClose={() => setActiveModel(null)}
        zoomMode={
          (activeModelZoom as "normal" | "moreless" | "less" | "large") ??
          "normal"
        }
      />
    </div>
  );
};

export default Amics;
