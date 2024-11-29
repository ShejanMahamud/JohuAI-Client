import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import React from "react";
import { CiMedicalClipboard } from "react-icons/ci";
import { FaSignature } from "react-icons/fa6";
import { TbFileBroken, TbTableColumn } from "react-icons/tb";
import BeforeAfterSlider from "./BeforeAfterSlider";
import HeadingText from "./HeadingText";

const Images: React.FC = () => {
  return (
    <div className="w-full pb-10">
      <HeadingText
        heading="Images like never seen before"
        paragraph="Discover endless creativity with PromptVerse. Generate diverse content
          effortlessly using prompts. Stay updated with real-time trends,
          automate tasks, and extract insights from any document or URL. All
          within a sleek, futuristic design. Create more, effortlessly."
        boxStyles="my-20"
      />
      <ImagesGrid />
    </div>
  );
};

export default Images;

export function ImagesGrid() {
  return (
    <BentoGrid className="w-[80%] mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const RemoveBackground = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <BeforeAfterSlider
      beforeImage="/before-remove-bg.jpg"
      afterImage="/after-remove-bg.webp"
    />
  </div>
);
const TextToImage = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    {/* <Image
      width={500}
      height={500}
      src="/polar-bear.jpg"
      alt="Before Image"
      className="absolute inset-0 w-full h-full object-cover"
    /> */}
    <img src="/polar-bear.jpg" className="w-full object-cover" />
  </div>
);
const SketchToImage = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/sketch-to-image.mp4" type="video/mp4" />
    </video>
  </div>
);
const ReplaceBackground = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/replace-background.mp4" type="video/mp4" />
    </video>
  </div>
);
const ProductPhotography = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/product-photography.mp4" type="video/mp4" />
    </video>
  </div>
);
const RemoveText = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/remove-text.mp4" type="video/mp4" />
    </video>
  </div>
);
const items = [
  {
    title: "Background Remover",
    description: "Remove background of any image instantly.",
    header: <RemoveBackground />,
    className: "md:col-span-2",
    icon: <CiMedicalClipboard className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Text To Image",
    description: "Convert text to image with a single click.",
    header: <TextToImage />,
    className: "md:col-span-1",
    icon: <TbFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sketch To Image",
    description: "Convert sketches to images in real-time.",
    header: <SketchToImage />,
    className: "md:col-span-1",
    icon: <FaSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Replace Background",
    description: "Replace background of any image with a single click.",
    header: <ReplaceBackground />,
    className: "md:col-span-2",
    icon: <TbTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Product Photography",
    description: "Create stunning product photos in seconds.",
    header: <ProductPhotography />,
    className: "md:col-span-2",
    icon: <TbTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Remove Text",
    description: "Remove text from any image in seconds.",
    header: <RemoveText />,
    className: "md:col-span-1",
    icon: <TbTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
