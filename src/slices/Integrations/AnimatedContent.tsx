"use client";

import StylizedLogoMark from "./StylizedLogoMark";
import React, { useRef } from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFly,
  FaFigma,
} from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.IntegrationsSlice;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const preferReduceMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  const icons = {
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    digitalocean: <FaDigitalOcean />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };

  useGSAP(
    () => {
      if (preferReduceMotion) return;

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      tl.to(".pulsing-logo", {
        keyFrames: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 7,
            duration: 0.9,
          },
        ],
      });

      tl.to(
        ".signal-line",
        {
          keyFrames: [
            { backgroundPosition: "0% 0%" },
            {
              backgroundPosition: "100% 100%",
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        "-=1.4",
      );
      tl.to(".pulsing-icon", {
        keyFrames: [
          {
            opacity: 1,
            stagger: { from: "center", each: 0.3 },
            duration: 1,
          },
          {
            opacity: 0.4,
            duration: 1,
            stagger: { from: "center", each: 0.3 },
          },
        ],
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="mt-20 flex flex-col items-center md:flex-row"
    >
      {slice.primary.icons.map((item, index) => (
        <React.Fragment key={index}>
          {index === Math.floor(slice.primary.icons.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {item.icon && icons[item.icon]}
          </div>
          {index !== slice.primary.icons.length - 1 && (
            <div
              className={clsx(
                "signal-line",
                index >= Math.floor(slice.primary.icons.length / 2)
                  ? "rotate-180"
                  : "rotate-0",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
