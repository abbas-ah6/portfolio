"use client";

import Link from "next/link";
import { asLink, Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import WordMark from "@/components/WordMark";
import ButtonLink from "@/components/ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link className="z-50" onClick={() => setOpen(false)} href={"/"}>
            <WordMark />
            <span className="sr-only">Abbas Portfolio Home Page</span>
          </Link>
          <button
            aria-expanded={open}
            onClick={() => setOpen(true)}
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Navbar */}

        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            aria-expanded={open}
            onClick={() => setOpen(false)}
            type="button"
            className="fixed right-4 top-4 mb-4 block p-2 text-3xl text-white md:hidden"
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            {settings?.data?.navigation.map((item) => {
              if (item?.cta_button) {
                return (
                  <ButtonLink
                    onClick={() => setOpen(false)}
                    key={item?.label}
                    field={item?.link}
                    aria-current={
                      pathname.includes(asLink(item?.link) as string) ? 'page' : undefined
                    }
                  >
                    {item?.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  onClick={() => setOpen(false)}
                  key={item?.label}
                  field={item?.link}
                  className="first:md-8 block px-3 text-3xl"
                  aria-current={
                    pathname.includes(asLink(item?.link) as string) ? 'page' : undefined
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Desktop Navbar */}
        <ul className="gap-6 hidden md:flex">
          {settings?.data?.navigation?.map((item, index) => {
            if (item?.cta_button) {
              return (
                <li key={index}>
                  <ButtonLink aria-current={pathname.includes(asLink(item?.link) as string) ? 'page' : undefined} field={item?.link} className="">
                    {item?.label}
                  </ButtonLink>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <PrismicNextLink
                    className="inline-flex min-h-11 items-center"
                    field={item?.link}
                  >
                    {item?.label}
                  </PrismicNextLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </nav>
  );
}
