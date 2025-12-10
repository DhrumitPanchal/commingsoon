"use client";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import Image from "next/image";
import { useEffect, useState } from "react";

const TimeBox = ({ label, value }: any) => (
  <div className="flex gap-2 bg-red rounded-xl p-4">
    <p className="text-center text-2xl text-white">{value}</p>
    <p className="text-center text-2xl ">{label}</p>
  </div>
);

// Helper: format a Date as a `datetime-local` input value: `YYYY-MM-DDTHH:MM`
const toDatetimeLocal = (d: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

const initialDeadline = new Date("2025-12-19T00:00");

export default function Home() {
  const [deadline, setDeadline] = useState<Date>(initialDeadline);

  const [days, setDays] = useState(0);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentDate = new Date();
      const timeLeft = deadline.getTime() - currentDate.getTime();

      // total seconds left, clamped to 0 so we don't show negatives
      const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setDays(days);
      setTimer({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
        <div className="relative z-999 inset-0 flex min-h-screen w-full flex-col gap-16 justify-between py-16 items-center">
          <BackgroundRippleEffect />

          <Image src="/logoO.svg" alt="Logo" width={120} height={120} />
          <div className="w-7xl h-auto flex flex-col gap-4 items-center">
            <h1 className="text-5xl font-bold text-white">Coming Soon</h1>

            <div className="w-fit h-auto overflow-hidden flex  items-center gap-2">
              <TimeBox label="Days" value={days} />
              <h2 className="text-2xl font-extralight">/</h2>
              <TimeBox label="Hours" value={timer.hours} />{" "}
              <h2 className="text-2xl font-extralight">/</h2>
              <TimeBox label="Minutes" value={timer.minutes} />{" "}
              <h2 className="text-2xl font-extralight">/</h2>
              <TimeBox label="Seconds" value={timer.seconds} />
            </div>
            <p className="w-1/3 text-center font-light text-sm">
              Something exciting is on the way. Our team is crafting a smarter
              digital experience to deliver innovative technology solutions for
              your business needs.
            </p>
          </div>

          <div>
            <h2 className="text-center font-light text-sm">
              For inquiries or support, contact us at{" "}
              <a href="mailto:contact@orglife.co.in" className="underline">
                contact@orglife.co.in
              </a>
            </h2>
          </div>
        </div>
      </div>

      {/* <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
       
        <div className="mt-60 w-full">
          <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
            Interactive Background Boxes Ripple Effect
          </h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
            Hover over the boxes above and click.To be used on backgrounds of
            hero sections OR Call to Action sections. I beg you don&apos;t use
            it everywhere.
          </p>
        </div>
      </div> */}
    </>
  );
}
