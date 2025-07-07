
import { SearchCheck, Settings2, ShoppingCart, PackageCheck  } from 'lucide-react';

const steps = [
    {
        icon: SearchCheck,
        title: "Find dit favoritprodukt",
        text: "Gå på opdagelse i sortimentet og vælg det, der passer til din stil eller begivenhed.",
        number: "1."
    },
    {
        icon: Settings2,
        title: "Tilpas og angiv antal",
        text: "Vælg antal og udfyld de ønskede detaljer (fx navn, farve, tekst).",
        number: "2."
    },
    {
        icon: ShoppingCart,
        title: "Bestil nemt online",
        text: "Læg i kurven og gennemfør din bestilling sikkert og hurtigt",
        number: "3."
    },
    {
        icon: PackageCheck,
        title: "Modtag dine 3D prints",
        text: "Vi pakker og sender direkte til dig - klar til brug!",
        number: "4."
    },
]

function WhyUs() {
    return(
        <section className="max-w-[1600px] mx-auto my-16 p-16">
            <h2 className="text-4xl font-bold text-center mb-8">Så nemt bestiller du hos 3Dazzle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-120 text-center justify-items-center">
                {steps.map((step, idx) => (
                    <div className="w-100 h-100 cursor-pointer rounded-xl hover:shadow-2xl hover:bg-[#EED600] p-4 flex flex-col justify-center 
                    items-center shadow transition-transform duration-400 ease-in-out hover:scale-105" 
                         key={idx}>
                        <step.icon className="mx-auto mb-4 w-24 h-24 text-[#000]" />
                        <div className="font-semibold mb-2 text-2xl">{step.title}</div>
                        <div className="text-lg text-[#5E5E5E]">{step.text}</div>
                        
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyUs;