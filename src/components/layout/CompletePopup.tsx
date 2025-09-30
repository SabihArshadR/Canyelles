
"use client";
import { useTranslations } from "next-intl";
import CustomButton from "../ui/Button";
import { useRouter } from "next/navigation";

const CompletePopup = ({ handleClose }: { handleClose: () => void }) => {
    const router = useRouter();
    const t = useTranslations("Dashboard");

    return (
        <div className={`fixed inset-0 p-4 flex flex-col items-end justify-end bg-black/70 z-50`}>

            <div className="relative w-full max-w-md bg-[#F5F3ED] rounded-2xl shadow-2xl p-3">
                <div className="space-y-4 flex flex-col">
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-center">{t("complete")}</h2>
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                        <CustomButton
                            onClick={handleClose}
                            className="rounded-xl"
                        >
                            {t("keep_playing")}
                        </CustomButton>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-4">
                <img
                    src="/intro.gif"
                    alt="Intro Gif"
                    className="w-[250px] rounded-lg"
                />
            </div>
        </div>
    );
};

export default CompletePopup;
