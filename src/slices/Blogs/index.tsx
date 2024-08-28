import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";
import Link from "next/link";

/**
 * Props for `Blogs`.
 */
export type BlogsProps = SliceComponentProps<Content.BlogsSlice>;

/**
 * Component for "Blogs" Slices.
 */
const Blogs = async ({ slice }: BlogsProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogs = await client.getAllByType("blog");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice?.primary?.heading} />
      </h2>
      <div className="max-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice?.primary?.body} />
      </div>
      <div className="mt-20 grid gap-16">
        {blogs?.map(
          (blog, index) =>
            blog && (
              <div
                key={blog?.id || index}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h3 className="text-4xl">
                    <PrismicText field={blog?.data?.blog_heading} />
                  </h3>
                  <div className="max-w-md">
                    <PrismicRichText field={blog?.data?.description} />
                  </div>
                  <PrismicNextLink
                    className="after:absolute after:inset-0 hover:underline"
                    document={blog}
                  >
                    Read full blog
                  </PrismicNextLink>
                </div>
                <PrismicNextImage
                  field={blog?.data?.blog_image}
                  quality={100}
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1",
                  )}
                />
              </div>
            ),
        )}
      </div>
    </Bounded>
  );
};

export default Blogs;
