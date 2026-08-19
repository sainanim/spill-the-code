"use client";
import { motion } from "framer-motion"
import { Bot, Sparkles, Image as ImageIcon } from "lucide-react";
import { FaFutbol } from "react-icons/fa";

interface EventSectionProps {
    id?: string;
}

/**
 * Edit these fields whenever a new event is coming up
 */
const event = {
    name: "Event Name",
    date: "Month day, year",
    location: "Event location",
    description: "Event Description",
};

/**
 * Decorative icons scattered around the whole section, behind
 * the content. Swap the icon component and/or position classes to match the
 * new event's theme (this is the same pattern old soccer robotics event used) — 
 * position classes are relative to the two-column wrapper below, so
 * you can place icons near either the text side or the image side.
 */
const backgroundIcons = [
    {
        icon: <FaFutbol className="w-20 h-20 text-blue-100 rotate-12" aria-hidden="true" />,
        position: "absolute -top-8 -left-6",
    },
    {
        icon: <Bot className="w-16 h-16 text-yellow-100 -rotate-12" strokeWidth={1.5} aria-hidden="true" />,
        position: "absolute -bottom-6 left-1/4",
    },
    {
        icon: <Sparkles className="w-10 h-10 text-blue-100" strokeWidth={1.5} aria-hidden="true" />,
        position: "absolute top-1/3 left-[45%]",
    },
    {
        icon: <FaFutbol className="w-16 h-16 text-yellow-100 -rotate-12" aria-hidden="true" />,
        position: "absolute -top-6 -right-4",
    },
    {
        icon: <Bot className="w-14 h-14 text-blue-100 rotate-12" strokeWidth={1.5} aria-hidden="true" />,
        position: "absolute -bottom-8 -right-6",
    },
];

const EventSection: React.FC<EventSectionProps> = ({ id }) => {
    return (
        <section id={id} className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-8 lg:px-12">
                {/* Scattered background icons sit behind both columns */}
                <div className="relative">
                    {backgroundIcons.map((bg, i) => (
                        <span key={i} className={`${bg.position} pointer-events-none z-0`}>
                            {bg.icon}
                        </span>
                    ))}

                    {/* Two-column body */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-2xl">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1976D2] mb-4 leading-tight">
                                    {event.name}
                                </h2>
                                <span className="inline-block bg-[#FFC000]/20 text-[#1976D2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-[#FFC000]/40">
                                    {event.date}
                                </span>
                                <p className="text-slate-500 text-lg sm:text-xl max-w-xl mx-auto mb-5">
                                    {event.location}
                                </p>
                                <p>
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>

                        {/* Right — picture container */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-[#FFC000] bg-slate-50 flex items-center justify-center">
                                {/*
                                  Drop the event picture in here, e.g.:
                                  <img src="/imgs/your-event-photo.jpg" alt={event.name} className="w-full h-full object-cover" />
                                */}
                                <ImageIcon className="w-12 h-12 text-slate-300" aria-hidden="true" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventSection;
