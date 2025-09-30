
"use client";
import Image from "next/image";

import Logo1 from "@/assets/popup/tosca.png";
import Logo2 from "@/assets/popup/Logo_tosca_V_web72_trans.png";

const Welcome = () => {
    return (
        <div className="fixed inset-0 p-2 flex items-center justify-center bg-black/50 z-50">
            <div className="relative w-full max-w-md bg-[#F5F3ED] rounded-2xl shadow-2xl p-3 flex flex-col items-center justify-center gap-4 py-18">
                <Image
                    src={Logo1}
                    alt="logo"
                />
                <Image
                    src={Logo2}
                    alt="logo"
                />
            </div>
        </div>
    );
};

export default Welcome;
