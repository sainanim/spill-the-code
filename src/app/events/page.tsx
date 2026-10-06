import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

export const metadata = {
  title: "Events | Spill the Code",
};

interface EventItem {
  flyer: string; // path under /public, e.g. "/events/robotics-showcase.png"
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

/**
 * To post a new event: drop the flyer image into /public/events/ and add an EventItem to the array below
 */
const events: EventItem[] = [
  {
    flyer: "/events/toastmasters.jpeg",
    name: "Weekly Toastmasters Club",
    date: "Every Sunday",
    time: "2 - 3:00 PM",
    location: "Spill the Code, Erin Mills town Centre",
    description: "Join our kids' Toastmasters club at Spill The Code, where young speakers aged 6–18 build confidence, sharpen their communication skills, and learn to share their ideas in a fun, supportive space!",
  },
  {
    flyer: "/events/mom_baby_workshop.jpeg",
    name: "Mom & Baby Sensory Play & Art Workshop",
    date: "October 25, 2026",
    time: "11 AM onwards",
    location: "Spill the Code, Erin Mills town Centre",
    description: "Spend quality time together exploring sensory play, creativity, and simple art activities in a safe & playful environment.",
  },
];

export default function EventsPage() {
  return (
    <main className="bg-[var(--background-primary)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] text-center mb-12">
          Events
        </h1>

        {events.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)] text-lg">
            No upcoming events right now. Check back soon!
          </p>
        ) : (
          <div className="flex flex-col gap-16">
            {events.map((event, i) => (
              <article
                key={event.flyer}
                className={`flex flex-col gap-8 lg:gap-12 lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
              >
                <a
                  href={event.flyer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block lg:w-1/2 rounded-2xl overflow-hidden shadow-lg border-2 border-[#FFC000] bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={event.flyer}
                    alt={`${event.name} flyer`}
                    width={0}
                    height={0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-auto"
                  />
                </a>

                <div className="lg:w-1/2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#1976D2] mb-5 leading-tight">
                    {event.name}
                  </h2>
                  <ul className="space-y-3 mb-6 text-slate-700">
                    <li className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#1976D2] shrink-0" aria-hidden="true" />
                      {event.date}
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#1976D2] shrink-0" aria-hidden="true" />
                      {event.time}
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#1976D2] shrink-0" aria-hidden="true" />
                      {event.location}
                    </li>
                  </ul>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
