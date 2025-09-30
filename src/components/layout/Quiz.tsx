"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import CustomButton from "../ui/Button";
import { useParams, useRouter } from "next/navigation";
import finding_1 from '@/assets/findings/1. clock tower.jpg'
import finding_2 from '@/assets/findings/2. rusty tools.jpg'
import finding_3 from '@/assets/findings/3. medieval sword.jpg'
import finding_4 from '@/assets/findings/4. basaltic rock.jpg'
import finding_5 from '@/assets/findings/5. chariot.jpg'
import finding_6 from '@/assets/findings/6. green frog.jpg'
import finding_7 from '@/assets/findings/7. willow.jpg'
import finding_8 from '@/assets/findings/8. eurasian.jpg'
import finding_9 from '@/assets/findings/9. trophy.jpg'
import api from "@/lib/axios";
import Loading from "./Loading";
import { useUser } from "@/context/UserContext";

const Quiz = () => {
  const { user, refreshUser } = useUser();
  const t = useTranslations();
  const t1 = useTranslations("QuizPage");
  const router = useRouter();
  const { id } = useParams();
  const volcanoId = Number(id);
  const findingImages = [
    finding_1,
    finding_2,
    finding_3,
    finding_4,
    finding_5,
    finding_6,
    finding_7,
    finding_8,
    finding_9,
  ];

  const findingNames = [
    t1("finding_1"),
    t1("finding_2"),
    t1("finding_3"),
    t1("finding_4"),
    t1("finding_5"),
    t1("finding_6"),
    t1("finding_7"),
    t1("finding_8"),
    t1("finding_9"),
  ];

  useEffect(() => {
    if (!user) return;
    const POICompleted = parseInt(user?.POIsCompleted ?? 0);
    if (POICompleted >= volcanoId) {
      router.push("/");
    }
  }, [volcanoId, router, user]);

  const volcanoQuestions = useMemo(
    () => ({
      1: [
        {
          title: t("Volcano1Quiz1.title"),
          options: [
            t("Volcano1Quiz1.option1"),
            t("Volcano1Quiz1.option2"),
            t("Volcano1Quiz1.option3"),
            t("Volcano1Quiz1.option4"),
          ],
          correct: t("Volcano1Quiz1.option1"),
        },
        {
          title: t("Volcano1Quiz2.title"),
          options: [
            t("Volcano1Quiz2.option1"),
            t("Volcano1Quiz2.option2"),
            t("Volcano1Quiz2.option3"),
            t("Volcano1Quiz2.option4"),
          ],
          correct: t("Volcano1Quiz2.option1"),
        },
        {
          title: t("Volcano1Quiz3.title"),
          options: [
            t("Volcano1Quiz3.option1"),
            t("Volcano1Quiz3.option2"),
            t("Volcano1Quiz3.option3"),
            t("Volcano1Quiz3.option4"),
          ],
          correct: t("Volcano1Quiz3.option1"),
        },
        {
          title: t("Volcano1Quiz4.title"),
          options: [
            t("Volcano1Quiz4.option1"),
            t("Volcano1Quiz4.option2"),
            t("Volcano1Quiz4.option3"),
            t("Volcano1Quiz4.option4"),
          ],
          correct: t("Volcano1Quiz4.option1"),
        },
      ],
      2: [
        {
          title: t("Volcano2Quiz1.title"),
          options: [
            t("Volcano2Quiz1.option1"),
            t("Volcano2Quiz1.option2"),
            t("Volcano2Quiz1.option3"),
            t("Volcano2Quiz1.option4"),
          ],
          correct: t("Volcano2Quiz1.option1"),
        },
        {
          title: t("Volcano2Quiz2.title"),
          options: [
            t("Volcano2Quiz2.option1"),
            t("Volcano2Quiz2.option2"),
            t("Volcano2Quiz2.option3"),
            t("Volcano2Quiz2.option4"),
          ],
          correct: t("Volcano2Quiz2.option1"),
        },
        {
          title: t("Volcano2Quiz3.title"),
          options: [
            t("Volcano2Quiz3.option1"),
            t("Volcano2Quiz3.option2"),
            t("Volcano2Quiz3.option3"),
            t("Volcano2Quiz3.option4"),
          ],
          correct: t("Volcano2Quiz3.option1"),
        },
        {
          title: t("Volcano2Quiz4.title"),
          options: [
            t("Volcano2Quiz4.option1"),
            t("Volcano2Quiz4.option2"),
            t("Volcano2Quiz4.option3"),
            t("Volcano2Quiz4.option4"),
          ],
          correct: t("Volcano2Quiz4.option1"),
        },
        {
          title: t("Volcano2Quiz5.title"),
          options: [
            t("Volcano2Quiz5.option1"),
            t("Volcano2Quiz5.option2"),
            t("Volcano2Quiz5.option3"),
            t("Volcano2Quiz5.option4"),
          ],
          correct: t("Volcano2Quiz5.option1"),
        },
      ],
      3: [
        {
          title: t("Volcano3Quiz1.title"),
          options: [
            t("Volcano3Quiz1.option1"),
            t("Volcano3Quiz1.option2"),
            t("Volcano3Quiz1.option3"),
            t("Volcano3Quiz1.option4"),
          ],
          correct: t("Volcano3Quiz1.option1"),
        },
        {
          title: t("Volcano3Quiz2.title"),
          options: [
            t("Volcano3Quiz2.option1"),
            t("Volcano3Quiz2.option2"),
            t("Volcano3Quiz2.option3"),
            t("Volcano3Quiz2.option4"),
          ],
          correct: t("Volcano3Quiz2.option1"),
        },
        {
          title: t("Volcano3Quiz3.title"),
          options: [
            t("Volcano3Quiz3.option1"),
            t("Volcano3Quiz3.option2"),
            t("Volcano3Quiz3.option3"),
            t("Volcano3Quiz3.option4"),
          ],
          correct: t("Volcano3Quiz3.option1"),
        },
        {
          title: t("Volcano3Quiz4.title"),
          options: [
            t("Volcano3Quiz4.option1"),
            t("Volcano3Quiz4.option2"),
            t("Volcano3Quiz4.option3"),
            t("Volcano3Quiz4.option4"),
          ],
          correct: t("Volcano3Quiz4.option1"),
        },
        {
          title: t("Volcano3Quiz5.title"),
          options: [
            t("Volcano3Quiz5.option1"),
            t("Volcano3Quiz5.option2"),
            t("Volcano3Quiz5.option3"),
            t("Volcano3Quiz5.option4"),
          ],
          correct: t("Volcano3Quiz5.option1"),
        },
        {
          title: t("Volcano3Quiz6.title"),
          options: [
            t("Volcano3Quiz6.option1"),
            t("Volcano3Quiz6.option2"),
            t("Volcano3Quiz6.option3"),
            t("Volcano3Quiz6.option4"),
          ],
          correct: t("Volcano3Quiz6.option1"),
        },
      ],
      4: [
        {
          title: t("Volcano4Quiz1.title"),
          options: [
            t("Volcano4Quiz1.option1"),
            t("Volcano4Quiz1.option2"),
            t("Volcano4Quiz1.option3"),
            t("Volcano4Quiz1.option4"),
          ],
          correct: t("Volcano4Quiz1.option1"),
        },
        {
          title: t("Volcano4Quiz2.title"),
          options: [
            t("Volcano4Quiz2.option1"),
            t("Volcano4Quiz2.option2"),
            t("Volcano4Quiz2.option3"),
            t("Volcano4Quiz2.option4"),
          ],
          correct: t("Volcano4Quiz2.option1"),
        },
        {
          title: t("Volcano4Quiz3.title"),
          options: [
            t("Volcano4Quiz3.option1"),
            t("Volcano4Quiz3.option2"),
            t("Volcano4Quiz3.option3"),
            t("Volcano4Quiz3.option4"),
          ],
          correct: t("Volcano4Quiz3.option1"),
        },
        {
          title: t("Volcano4Quiz4.title"),
          options: [
            t("Volcano4Quiz4.option1"),
            t("Volcano4Quiz4.option2"),
            t("Volcano4Quiz4.option3"),
            t("Volcano4Quiz4.option4"),
          ],
          correct: t("Volcano4Quiz4.option1"),
        },
        {
          title: t("Volcano4Quiz5.title"),
          options: [
            t("Volcano4Quiz5.option1"),
            t("Volcano4Quiz5.option2"),
            t("Volcano4Quiz5.option3"),
            t("Volcano4Quiz5.option4"),
          ],
          correct: t("Volcano4Quiz5.option1"),
        },
        {
          title: t("Volcano4Quiz6.title"),
          options: [
            t("Volcano4Quiz6.option1"),
            t("Volcano4Quiz6.option2"),
            t("Volcano4Quiz6.option3"),
            t("Volcano4Quiz6.option4"),
          ],
          correct: t("Volcano4Quiz6.option1"),
        },
      ],
      5: [
        {
          title: t("Volcano5Quiz1.title"),
          options: [
            t("Volcano5Quiz1.option1"),
            t("Volcano5Quiz1.option2"),
            t("Volcano5Quiz1.option3"),
            t("Volcano5Quiz1.option4"),
          ],
          correct: t("Volcano5Quiz1.option1"),
        },
        {
          title: t("Volcano5Quiz2.title"),
          options: [
            t("Volcano5Quiz2.option1"),
            t("Volcano5Quiz2.option2"),
            t("Volcano5Quiz2.option3"),
            t("Volcano5Quiz2.option4"),
          ],
          correct: t("Volcano5Quiz2.option1"),
        },
        {
          title: t("Volcano5Quiz3.title"),
          options: [
            t("Volcano5Quiz3.option1"),
            t("Volcano5Quiz3.option2"),
            t("Volcano5Quiz3.option3"),
            t("Volcano5Quiz3.option4"),
          ],
          correct: t("Volcano5Quiz3.option1"),
        },
        {
          title: t("Volcano5Quiz4.title"),
          options: [
            t("Volcano5Quiz4.option1"),
            t("Volcano5Quiz4.option2"),
            t("Volcano5Quiz4.option3"),
            t("Volcano5Quiz4.option4"),
          ],
          correct: t("Volcano5Quiz4.option1"),
        },
      ],
      6: [
        {
          title: t("Volcano6Quiz1.title"),
          options: [
            t("Volcano6Quiz1.option1"),
            t("Volcano6Quiz1.option2"),
            t("Volcano6Quiz1.option3"),
            t("Volcano6Quiz1.option4"),
          ],
          correct: t("Volcano6Quiz1.option1"),
        },
        {
          title: t("Volcano6Quiz2.title"),
          options: [
            t("Volcano6Quiz2.option1"),
            t("Volcano6Quiz2.option2"),
            t("Volcano6Quiz2.option3"),
            t("Volcano6Quiz2.option4"),
          ],
          correct: t("Volcano6Quiz2.option1"),
        },
        {
          title: t("Volcano6Quiz3.title"),
          options: [
            t("Volcano6Quiz3.option1"),
            t("Volcano6Quiz3.option2"),
            t("Volcano6Quiz3.option3"),
            t("Volcano6Quiz3.option4"),
          ],
          correct: t("Volcano6Quiz3.option1"),
        },
        {
          title: t("Volcano6Quiz4.title"),
          options: [
            t("Volcano6Quiz4.option1"),
            t("Volcano6Quiz4.option2"),
            t("Volcano6Quiz4.option3"),
            t("Volcano6Quiz4.option4"),
          ],
          correct: t("Volcano6Quiz4.option1"),
        },
        {
          title: t("Volcano6Quiz5.title"),
          options: [
            t("Volcano6Quiz5.option1"),
            t("Volcano6Quiz5.option2"),
            t("Volcano6Quiz5.option3"),
            t("Volcano6Quiz5.option4"),
          ],
          correct: t("Volcano6Quiz5.option1"),
        },
        {
          title: t("Volcano6Quiz6.title"),
          options: [
            t("Volcano6Quiz6.option1"),
            t("Volcano6Quiz6.option2"),
            t("Volcano6Quiz6.option3"),
            t("Volcano6Quiz6.option4"),
          ],
          correct: t("Volcano6Quiz6.option1"),
        },
      ],
      7: [
        {
          title: t("Volcano7Quiz1.title"),
          options: [
            t("Volcano7Quiz1.option1"),
            t("Volcano7Quiz1.option2"),
            t("Volcano7Quiz1.option3"),
            t("Volcano7Quiz1.option4"),
          ],
          correct: t("Volcano7Quiz1.option1"),
        },
        {
          title: t("Volcano7Quiz2.title"),
          options: [
            t("Volcano7Quiz2.option1"),
            t("Volcano7Quiz2.option2"),
            t("Volcano7Quiz2.option3"),
            t("Volcano7Quiz2.option4"),
          ],
          correct: t("Volcano7Quiz2.option1"),
        },
        {
          title: t("Volcano7Quiz3.title"),
          options: [
            t("Volcano7Quiz3.option1"),
            t("Volcano7Quiz3.option2"),
            t("Volcano7Quiz3.option3"),
            t("Volcano7Quiz3.option4"),
          ],
          correct: t("Volcano7Quiz3.option1"),
        },
        {
          title: t("Volcano7Quiz4.title"),
          options: [
            t("Volcano7Quiz4.option1"),
            t("Volcano7Quiz4.option2"),
            t("Volcano7Quiz4.option3"),
            t("Volcano7Quiz4.option4"),
          ],
          correct: t("Volcano7Quiz4.option1"),
        },
        {
          title: t("Volcano7Quiz5.title"),
          options: [
            t("Volcano7Quiz5.option1"),
            t("Volcano7Quiz5.option2"),
            t("Volcano7Quiz5.option3"),
            t("Volcano7Quiz5.option4"),
          ],
          correct: t("Volcano7Quiz5.option1"),
        },
      ],
      8: [
        {
          title: t("Volcano8Quiz1.title"),
          options: [
            t("Volcano8Quiz1.option1"),
            t("Volcano8Quiz1.option2"),
            t("Volcano8Quiz1.option3"),
            t("Volcano8Quiz1.option4"),
          ],
          correct: t("Volcano8Quiz1.option1"),
        },
        {
          title: t("Volcano8Quiz2.title"),
          options: [
            t("Volcano8Quiz2.option1"),
            t("Volcano8Quiz2.option2"),
            t("Volcano8Quiz2.option3"),
            t("Volcano8Quiz2.option4"),
          ],
          correct: t("Volcano8Quiz2.option1"),
        },
        {
          title: t("Volcano8Quiz3.title"),
          options: [
            t("Volcano8Quiz3.option1"),
            t("Volcano8Quiz3.option2"),
            t("Volcano8Quiz3.option3"),
            t("Volcano8Quiz3.option4"),
          ],
          correct: t("Volcano8Quiz3.option1"),
        },
        {
          title: t("Volcano8Quiz4.title"),
          options: [
            t("Volcano8Quiz4.option1"),
            t("Volcano8Quiz4.option2"),
            t("Volcano8Quiz4.option3"),
            t("Volcano8Quiz4.option4"),
          ],
          correct: t("Volcano8Quiz4.option1"),
        },
        {
          title: t("Volcano8Quiz5.title"),
          options: [
            t("Volcano8Quiz5.option1"),
            t("Volcano8Quiz5.option2"),
            t("Volcano8Quiz5.option3"),
            t("Volcano8Quiz5.option4"),
          ],
          correct: t("Volcano8Quiz5.option1"),
        },
      ],
      9: [
        {
          title: t("Volcano9Quiz1.title"),
          options: [
            t("Volcano9Quiz1.option1"),
            t("Volcano9Quiz1.option2"),
            t("Volcano9Quiz1.option3"),
            t("Volcano9Quiz1.option4"),
          ],
          correct: t("Volcano9Quiz1.option1"),
        },
        {
          title: t("Volcano9Quiz2.title"),
          options: [
            t("Volcano9Quiz2.option1"),
            t("Volcano9Quiz2.option2"),
            t("Volcano9Quiz2.option3"),
            t("Volcano9Quiz2.option4"),
          ],
          correct: t("Volcano9Quiz2.option1"),
        },
        {
          title: t("Volcano9Quiz3.title"),
          options: [
            t("Volcano9Quiz3.option1"),
            t("Volcano9Quiz3.option2"),
            t("Volcano9Quiz3.option3"),
            t("Volcano9Quiz3.option4"),
          ],
          correct: t("Volcano9Quiz3.option1"),
        },
        {
          title: t("Volcano9Quiz4.title"),
          options: [
            t("Volcano9Quiz4.option1"),
            t("Volcano9Quiz4.option2"),
            t("Volcano9Quiz4.option3"),
            t("Volcano9Quiz4.option4"),
          ],
          correct: t("Volcano9Quiz4.option1"),
        },
        {
          title: t("Volcano9Quiz5.title"),
          options: [
            t("Volcano9Quiz5.option1"),
            t("Volcano9Quiz5.option2"),
            t("Volcano9Quiz5.option3"),
            t("Volcano9Quiz5.option4"),
          ],
          correct: t("Volcano9Quiz5.option1"),
        },
      ],
    }),
    [t]
  );

  const allQuestions =
    volcanoQuestions[volcanoId as keyof typeof volcanoQuestions] || [];

  const labels = ["A", "B", "C", "D"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [texts, setTexts] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

  function shuffleArray(array: any[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const handleSelect = (optionText: string) => {
    setSelected(optionText);

    if (optionText === selectedQuestion.correct) {
      setTimeout(() => {
        setQuizCompleted(true);
      }, 800);
    } else {
      setTimeout(() => {
        setShowPlayAgain(true);
      }, 1000);
    }
  };

  const handlePlayAgain = () => {
    if (selectedQuestion) {
      setTexts(shuffleArray(selectedQuestion.options));
    }
    setSelected(null);
    setShowPlayAgain(false);
  };

  const getOptionClass = (optionText: string) => {
    if (!selected) return "bg-white border-primary text-primary";

    if (selected === selectedQuestion.correct && optionText === selectedQuestion.correct) {
      return "bg-lightgreen border-lightgreen text-white";
    }

    if (selected !== selectedQuestion.correct) {
      if (optionText === selected) return "bg-red border-red text-white";
      if (optionText === selectedQuestion.correct) return "bg-lightgreen border-lightgreen text-white";
    }

    return "bg-white border-primary text-primary";
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      const randomQ = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      setSelectedQuestion(randomQ);
      setTexts(shuffleArray(randomQ.options));
    }
  }, [allQuestions]);

  useEffect(() => {
    if (quizCompleted) {
      const storeQuizStatus = async () => {
        try {
          await api.post("/poi-completed", {
            poiCompleted: volcanoId,
          });
        } catch (err: any) {
          console.error("Failed to update:", err.response?.data || err.message);
        }
      };
      storeQuizStatus();
    }
  }, [quizCompleted, volcanoId]);

  if (quizCompleted) {

    return (
      <div className="flex flex-col justify-center px-5 h-[80vh] items-center">
        {findingImages[volcanoId - 1] && (
          <img
            src={findingImages[volcanoId - 1].src}
            alt={`Finding for Volcano ${volcanoId}`}
            className="max-w-[90%]  mb-4"
          />
        )}
        <h1 className="text-xl font-bold text-primary mb-12 text-center">
          {findingNames[volcanoId - 1]}
        </h1>
        {/* <h1 className="text-lg text-primary mb-6 text-center">
          {t1("description")}
        </h1> */}
        <CustomButton onClick={() => {
          refreshUser();
          router.push("/");
        }}>
          {t1("button")}
        </CustomButton>
      </div>
    );
  }

  if (allQuestions.length === 0) {
    return <p className="text-center mt-10">No quiz found for this volcano.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center pb-[95px] ">
      <div className="bg-white w-full flex h-[242px] items-center justify-center">
        <h1 className="text-4xl font-bold text-primary text-center px-[38px]">
          {selectedQuestion?.title}
        </h1>

      </div>
      <div className="flex flex-col gap-4 mt-[72px] px-4 w-full">
        {labels.map((label, index) => (
          <div
            key={index}
            onClick={() => !selected && handleSelect(texts[index])}
            className={`min-h-[56px] rounded-4xl border-2 px-4 py-3 flex items-center gap-4 cursor-pointer transition-colors duration-300 ${getOptionClass(
              texts[index]
            )}`}
          >
            <div className="font-bold flex items-center justify-center">{label}</div>
            <h1 className="text-sm">{texts[index]}</h1>
          </div>
        ))}
      </div>
      {showPlayAgain && (
        <CustomButton onClick={handlePlayAgain} className="mt-6">
          {t1("try_again")}
        </CustomButton>
      )}
    </div>
  );
};

export default Quiz;
