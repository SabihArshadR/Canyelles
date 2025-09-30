
"use client";
import { FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Logo1 from "@/assets/learn_more/1.ajuntament.png";
import Logo2 from "@/assets/learn_more/2.descoberta-familia.png";
import Logo3 from "@/assets/learn_more/3.itinerari.png";
import Logo4 from "@/assets/learn_more/4.web-parcnatural.png";
import Logo5 from "@/assets/learn_more/5.web-turismegarrotxa.png";

const links = [
    {
        title: "Ajuntament de Castellfollit de la Roca",
        url: "https://castellfollitdelaroca.cat/",
        logo: Logo1,
    },
    {
        title: "Descoberta en Família de Castellfollit de la Roca",
        url: "https://parcsnaturals.gencat.cat/web/.content/Xarxa-de-parcs/garrotxa/coneix-nostra-feina/centre-documentacio/estudis/educacio-ambiental/EM-descoberta-familia/2023/castellfollit-p-acc.pdf",
        logo: Logo2,
    },
    {
        title: "Itinerari de Castellfollit de la Roca",
        url: "https://parcsnaturals.gencat.cat/web/.content/Xarxa-de-parcs/garrotxa/gaudeix-parc/equipaments-itineraris/itineraris/a-peu/13.PNZVG-CASTELLFOLLIT-cat.pdf",
        logo: Logo3,
    },
    {
        title: "Web Parc Natural de la Zona Volcànica de la Garrotxa",
        url: "https://parcsnaturals.gencat.cat/ca/xarxa-de-parcs/garrotxa/inici/index.html",
        logo: Logo4,
    },
    {
        title: "Web Turisme Garrotxa",
        url: "https://ca.turismegarrotxa.com/itineraris-i-rutes/la-cinglera-basaltica-de-castellfollit-de-la-roca-22/",
        logo: Logo5,
    },
];

const SplashPopUp = ({ handleClose }: { handleClose: () => void }) => {
    const t = useTranslations("Dashboard");

    return (
        <div className="fixed inset-0 p-2 flex items-center justify-center bg-black/50 z-50">
            <div className="relative w-full max-w-md bg-[#F5F3ED] rounded-2xl shadow-2xl p-3 overflow-y-scroll max-h-[85vh]">

                <div className="flex  gap-3 p-4 ">
                    <button onClick={handleClose} className="p-1">
                        <FiArrowLeft size={24} />
                    </button>
                </div>

                <div className="flex-1  p-4">
                    {links.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-4  py-3"
                        >
                            <div>
                                <h2 className="text-xl font-medium text-gray-800">{item.title}</h2>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-sm font-medium text-gray-800 hover:underline"
                                >
                                    {t("read_more")}
                                </a>
                            </div>

                            <div className="w-32 h-32 flex-shrink-0 relative">
                                <Image
                                    src={item.logo}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SplashPopUp;
