import ObjectRemover from "@/components/object-remover/object-remover";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Object Remover - Dashboard",
  description: "Remove objects from your images with advanced AI technology",
};

export default function ObjectRemoverPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 animate-fade-in">
            AI-Powered Object Removal
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Transform your images instantly. Remove unwanted objects, people, or
            imperfections with just a few clicks.
          </p>
          {/* <Button size="lg" className="animate-bounce">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </div>
        <ObjectRemover />
      </div>
    </div>
  );
}
