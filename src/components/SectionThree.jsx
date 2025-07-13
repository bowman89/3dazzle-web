import Bordkort from "../assets/bordkort.png";
import DeskOrganizer from "../assets/desk-organizer.png";
import HeadsetStand from "../assets/headset-stand.png";

function SectionThree() {
    return(
        <section className="bg-dark-gray py-20">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="!text-sm !font-semibold text-gold mb-8">UDVALGTE FAVORITTER</h2>

                {/* Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Card 1 */}
                    <a href="#" onClick={e => e.preventDefault()} className="group h-full">
                    <div className="bg-dark shadow-lg rounded flex flex-col h-full">
                        <div className="w-full h-60 overflow-hidden rounded-t">
                        <img src={Bordkort} alt="bordkort" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                        <h3 className="
                            text-white font-bold !text-lg mb-2 pb-1
                            relative inline-block
                            transition-colors duration-200
                            after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gold after:rounded
                            after:transition-transform after:duration-400 after:origin-bottom after:scale-y-0
                            group-hover:text-gold group-hover:after:scale-y-100
                        ">
                            Kreative bordkort <span className="ml-2">{'>'}</span>
                        </h3>
                        <p className="text-gray-300 text-base">
                            Skab et flot og unikt udtryk til festen med 3D printede bordkort. Vælg mellem forskellige designs, farver og skrifttyper.
                        </p>
                        </div>
                    </div>
                    </a>

                    {/* Card 2 */}
                    <a href="#" onClick={e => e.preventDefault()} className="group h-full">
                    <div className="bg-dark shadow-lg rounded flex flex-col h-full">
                        <div className="w-full h-60 overflow-hidden rounded-t">
                        <img src={DeskOrganizer} alt="desk organizer" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                        <h3 className="
                            text-white font-bold !text-lg mb-2 pb-1
                            relative inline-block
                            transition-colors duration-200
                            after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gold after:rounded
                            after:transition-transform after:duration-400 after:origin-bottom after:scale-y-0
                            group-hover:text-gold group-hover:after:scale-y-100
                        ">
                            Stilfulde penneholdere <span className="ml-2">{'>'}</span>
                        </h3>
                        <p className="text-gray-300 text-base">
                            Hold styr på kuglepenne og småting med moderne 3D-printede holdere – både praktisk og dekorativt til skrivebordet.
                        </p>
                        </div>
                    </div>
                    </a>

                    {/* Card 3 */}
                    <a href="#" onClick={e => e.preventDefault()} className="group h-full">
                    <div className="bg-dark shadow-lg rounded flex flex-col h-full">
                        <div className="w-full h-60 overflow-hidden rounded-t">
                        <img src={HeadsetStand} alt="headset stand" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                        <h3 className="
                            text-white font-bold !text-lg mb-2 pb-1
                            relative inline-block
                            transition-colors duration-200
                            after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gold after:rounded
                            after:transition-transform after:duration-400 after:origin-bottom after:scale-y-0
                            group-hover:text-gold group-hover:after:scale-y-100
                        ">
                            Headset stander <span className="ml-2">{'>'}</span>
                        </h3>
                        <p className="text-gray-300 text-base">
                            Få styr på dit gamer-setup eller kontoret med en 3D-printet headset stander, der både beskytter og fremhæver dit udstyr på skrivebordet.
                        </p>
                        </div>
                    </div>
                    </a>    

                </div>
            </div>
        </section>
    )
}

export default SectionThree;
