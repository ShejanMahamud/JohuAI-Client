import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import React from "react";
import HyperText from "./ui/hyper-text";
const MoreFeatures: React.FC = () => {
  return (
    <div className="w-full my-28 lg:px-20 px-10">
      <h1 className="text-[#ffffff80] font-manrope lg:text-5xl text-3xl tracking-[-1.165px] lg:leading-[64px]">
        More features <br />
        <HyperText text="Johu AI" className="text-white" /> offers to an
        individual
      </h1>
      <PromptsMarque />
    </div>
  );
};

export default MoreFeatures;

const features = [
  {
    title: "Text Summarizer",
    text: "Effortlessly condense lengthy articles, reports, or essays into concise summaries while retaining all key points. Perfect for quick understanding!",
  },
  {
    title: "AI Detector",
    text: "Identify AI-generated content with unmatched accuracy. Perfect for educators and content creators ensuring originality.",
  },
  {
    title: "Code Generator",
    text: "Transform plain language into functional code snippets across multiple programming languages. Your coding assistant is here!",
  },
  {
    title: "Grammar and Spell Checker",
    text: "Enhance the clarity and professionalism of your writing with AI-driven grammar, punctuation, and spelling suggestions.",
  },
  {
    title: "Email Assistant",
    text: "Draft emails with precision and professionalism, or let the AI handle replies based on context. Save time and stay productive!",
  },
  {
    title: "Creative Writing Helper",
    text: "Brainstorm ideas or co-write blogs, poems, and stories with AI assistance, tailored to your preferred tone and style.",
  },
  {
    title: "Language Translator",
    text: "Translate text seamlessly between multiple languages while preserving context and nuance. Ideal for global communication.",
  },
  {
    title: "Voice-to-Text Converter",
    text: "Convert audio recordings into accurate, readable text with AI-powered transcription. Perfect for meetings, lectures, and interviews.",
  },
  {
    title: "Text-to-Speech Reader",
    text: "Turn written content into natural-sounding audio, providing a hands-free way to consume information.",
  },
  {
    title: "Plagiarism Checker",
    text: "Ensure your work is original by scanning for potential matches against a vast database of online content.",
  },
  {
    title: "Research Assistant",
    text: "Summarize and organize research papers, articles, and other documents into actionable insights for your projects.",
  },
  {
    title: "Resume Builder",
    text: "Generate professional resumes tailored to your experience and target job roles, complete with optimized formatting.",
  },
  {
    title: "Presentation Generator",
    text: "Create visually appealing and informative slide decks from your input with AI-assisted design and layout.",
  },
  {
    title: "Sentiment Analysis",
    text: "Analyze the sentiment behind text to gauge emotional tone, helping you refine messages for your audience.",
  },
  {
    title: "Data Visualization Helper",
    text: "Transform raw data into clear, actionable charts and graphs to better communicate insights and trends.",
  },
  {
    title: "Question Generator",
    text: "Generate quiz or exam questions from a given text or topic, complete with answer keys for effective learning.",
  },
  {
    title: "Story Plot Generator",
    text: "Create unique and engaging story ideas with plot outlines tailored to your preferred genre and themes.",
  },
  {
    title: "Social Media Content Creator",
    text: "Craft engaging posts, captions, and hashtags for social media platforms, tailored to your audience and brand voice.",
  },
  {
    title: "Knowledge Quiz Maker",
    text: "Build fun and educational quizzes based on specific topics or input material, complete with scoring logic.",
  },
  {
    title: "Product Description Generator",
    text: "Write compelling and SEO-friendly product descriptions to boost online sales and engagement.",
  },
];

const ReviewCard = ({ text, title }: { text: string; title: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] ",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] border border-[#ffffff33]"
      )}
    >
      <div className="flex flex-row items-center gap-2 ">
        <div className="flex flex-col">
          <p className="text-xs font-medium text-white dark:text-white">
            {title}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-[#ffffff99] dark:text-[#ffffff99]">
        {text}
      </blockquote>
    </figure>
  );
};

export function PromptsMarque() {
  const firstRow = features.slice(0, features.length / 2);
  const secondRow = features.slice(features.length / 2);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-y-5 mt-10 overflow-hidden rounded-lg bg-background md:shadow-xl ">
      <Marquee pauseOnHover className="[--duration:50s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} title={review.title} text={review.text} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:50s]">
        {secondRow.map((review, index) => (
          <ReviewCard
            key={index + features.length / 2}
            title={review.title}
            text={review.text}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
    </div>
  );
}
