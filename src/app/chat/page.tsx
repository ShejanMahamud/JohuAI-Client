"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { ConversationHeader } from "@/components/ConversationHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  deleteAiAssistantConversation,
  getAiAssistantConversation,
  getAiAssistantConversations,
  sendAiAssistantPrompt,
  updateAiAssistantConversation,
} from "@/lib/aiAssistantRoute";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  ImageIcon,
  Loader2,
  MessageSquare,
  Plus,
  Send,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  _id: string;
  title: string;
  messages: Message[];
  meta?: {
    model: string;
    tone: string;
    temperature: number;
    language: string;
  };
}

const Chat = () => {
  const router = useRouter();
  const { user, loading } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [model, setModel] = useState("gemma2-9b-it");
  const [tone, setTone] = useState("energetic");
  const { toast } = useToast();
  const [botId, setBotId] = useState<string>("ai-assistant");
  const [typingText, setTypingText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (user) {
      try {
        fetchConversations();
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        toast({
          title: "Error",
          description: "Failed to fetch conversations",
          variant: "destructive",
        });
      }
    }
  }, [user, title]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [currentConversation, typingText]);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const fetchConversations = async () => {
    try {
      const data = await getAiAssistantConversations(user._id, title);
      if (data.success) setConversations(data.data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    setIsLoading(true);
    setIsThinking(true);

    const newMessage: Message = {
      role: "user",
      content: input.trim(),
    };
    setInput("");

    if (currentConversation) {
      setCurrentConversation((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
      );
    } else {
      try {
        const res = await sendAiAssistantPrompt({
          user: user._id,
          prompt: newMessage.content,
          model,
          tone,
          language: "en",
          botId,
        });

        if (res.success && res.conversation) {
          const newConversation: Conversation = {
            ...res.conversation,
            title: res.conversation.title || "New Chat",
          };
          setCurrentConversation(newConversation);
          setConversations((prev) => [newConversation, ...prev]);
        }
      } catch (error) {
        console.error("Error creating conversation:", error);
        toast({
          title: "Error",
          description: "Failed to create a new conversation",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsThinking(false);
      }
      return;
    }

    try {
      const res = await sendAiAssistantPrompt({
        user: user._id,
        prompt: newMessage.content,
        model,
        tone,
        botId,
        language: "en",
        conversationId: currentConversation._id,
      });

      if (res.success && res.conversation) {
        const updatedConversation: Conversation = res.conversation;
        setCurrentConversation(updatedConversation);
        setConversations((prev) =>
          prev.map((conv) =>
            conv._id === updatedConversation._id ? updatedConversation : conv
          )
        );
        const aiResponse =
          updatedConversation.messages[updatedConversation.messages.length - 1]
            .content;
        setTypingText("");
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < aiResponse.length) {
            setTypingText((prev) => prev + aiResponse[i]);
            i++;
          } else {
            clearInterval(typingInterval);
            setTypingText("");
            setIsThinking(false);
            setCurrentConversation((prev) => {
              if (prev) {
                const updatedMessages = [...prev.messages];
                updatedMessages[updatedMessages.length - 1] = {
                  role: "assistant",
                  content: aiResponse,
                };
                return { ...prev, messages: updatedMessages };
              }
              return prev;
            });
          }
        }, 30);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setCurrentConversation((prev) =>
        prev
          ? {
              ...prev,
              messages: [
                ...prev.messages,
                { role: "assistant", content: "An error occurred. Try again." },
              ],
            }
          : null
      );
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleNewConversation = () => setCurrentConversation(null);

  const selectConversation = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const data = await getAiAssistantConversation(user._id, conversationId);
      if (data.success && data.data) setCurrentConversation(data.data);
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "The code has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleDeleteConversation = async () => {
    if (!currentConversation) return;
    try {
      const result = await deleteAiAssistantConversation(
        currentConversation._id
      );
      if (result.success) {
        fetchConversations();
        toast({
          title: "Conversation deleted",
          description: result.message,
        });
        setConversations((prev) =>
          prev.filter((conv) => conv._id !== currentConversation._id)
        );
        setCurrentConversation(null);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
    }
  };

  const handleRenameConversation = async (newTitle: string) => {
    if (!currentConversation) return;
    try {
      const result = await updateAiAssistantConversation(
        currentConversation._id,
        { title: newTitle }
      );
      if (result.success) {
        fetchConversations();
        toast({
          title: "Conversation renamed",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error renaming conversation:", error);
      toast({
        title: "Error",
        description: "Failed to rename conversation",
        variant: "destructive",
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen"
      >
        <div className="p-4">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleNewConversation}
          >
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
        <div className="px-4 pb-2">
          <Input
            type="text"
            placeholder="Search conversation..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <ScrollArea className="flex-grow">
          <AnimatePresence>
            {conversations ? (
              conversations.map((conv) => (
                <motion.div
                  key={conv._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="px-2"
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left py-2 px-2 rounded-md ${
                      currentConversation?._id === conv._id
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => selectConversation(conv._id)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate">
                            {conv.title.length > 20
                              ? `${conv.title.substring(0, 50)}...`
                              : conv.title || "Untitled"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {conv.title || "Untitled"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Button>
                  <Separator className="my-2" />
                </motion.div>
              ))
            ) : (
              <div className="flex justify-center items-center h-20">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
        <div className="p-4 mt-auto">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
          </Button>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 m-4 overflow-hidden border-gray-200 dark:border-gray-700">
          <CardContent className="p-0 flex flex-col h-full">
            {currentConversation ? (
              <>
                <ConversationHeader
                  conversation={currentConversation}
                  onRename={handleRenameConversation}
                  onDelete={handleDeleteConversation}
                />
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <AnimatePresence>
                    {currentConversation?.messages
                      .filter((msg) => msg.role !== "system")
                      .map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`mb-4 flex ${
                            msg.role === "user"
                              ? "justify-end"
                              : "justify-start flex-col"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-white/90 text-primary-foreground font-manrope"
                                : "bg-gray-200 dark:bg-[#18181B] text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              {msg.role === "user" ? (
                                <span className="font-semibold">{""}</span>
                              ) : (
                                <>
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src="/logo.png" alt="AI" />
                                    <AvatarFallback>AI</AvatarFallback>
                                  </Avatar>
                                  <span className="font-semibold">Johu AI</span>
                                </>
                              )}
                            </div>
                            <Markdown
                              components={{
                                code({
                                  node,
                                  inline,
                                  className,
                                  children,
                                  ...props
                                }) {
                                  const match = /language-(\w+)/.exec(
                                    className || ""
                                  );
                                  return !inline && match ? (
                                    <div className="relative">
                                      <SyntaxHighlighter
                                        style={atomOneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, "")}
                                      </SyntaxHighlighter>
                                      <button
                                        onClick={() =>
                                          copyToClipboard(String(children))
                                        }
                                        className="absolute top-2 right-2 p-1 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                                p: ({ children }) => (
                                  <p className="mb-2">{children}</p>
                                ),
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline inline-flex items-center"
                                  >
                                    {children}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                ),
                                img: ({ src, alt }) => (
                                  <div className="relative w-full h-48 my-2">
                                    <img
                                      src={src}
                                      alt={alt}
                                      className="object-contain w-full h-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                                      <a
                                        href={src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white flex items-center"
                                      >
                                        <ImageIcon className="mr-2" />
                                        View full image
                                      </a>
                                    </div>
                                  </div>
                                ),
                              }}
                              remarkPlugins={[remarkGfm]}
                            >
                              {msg.role === "assistant" &&
                              index === currentConversation.messages.length - 1
                                ? typingText || msg.content
                                : msg.content}
                            </Markdown>
                            {msg.role === "assistant" &&
                              index ===
                                currentConversation.messages.length - 1 &&
                              typingText !== msg.content && (
                                <span className="inline-block w-2 h-4 ml-1 bg-gray-900 dark:bg-gray-100 animate-blink"></span>
                              )}
                          </div>
                          {msg.role === "assistant" && (
                            <div className="mt-2 flex justify-start space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(msg.content)}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                              {/* <Button variant="outline" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Like
                              </Button>
                              <Button variant="outline" size="sm">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Dislike
                              </Button> */}
                            </div>
                          )}
                        </motion.div>
                      ))}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isThinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center p-4"
                      >
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>AI is thinking...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Card className="w-full max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle>Welcome to AI Chat Assistant</CardTitle>
                    <CardDescription>
                      Get started by choosing an option below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Button className="justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start a new conversation
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Try a sample conversation
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Explore AI capabilities
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("text");
                    setInput((prevInput) => prevInput + pastedText);
                  }}
                  placeholder="Type your message here..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isLoading || isThinking}
                  className="flex-1 min-h-[40px] max-h-[200px] resize-none"
                  rows={2}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleSend}
                        disabled={isLoading || isThinking}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Chat Settings</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <Switch
                          id="dark-mode"
                          checked={isDarkMode}
                          onCheckedChange={setIsDarkMode}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="model">Model</Label>
                        <Select value={model} onValueChange={setModel}>
                          <SelectTrigger id="model">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="gemma2-9b-it">
                              Gemma 2 9B
                            </SelectItem>
                            <SelectItem value="llama-3.3-70b-versatile">
                              llama-3.3-70b-versatile
                            </SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="botId">AI Variants</Label>
                        <Select value={botId} onValueChange={setBotId}>
                          <SelectTrigger id="botId">
                            <SelectValue placeholder="Select a variant" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="ai-assistant">
                              AI Assistant
                            </SelectItem>
                            <SelectItem value="code-assistant">
                              Code Assistant
                            </SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="tone">Tone</Label>
                        <Select
                          value={tone}
                          onValueChange={(value) => setTone(value)}
                        >
                          <SelectTrigger id="tone">
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="professional">
                              Professional
                            </SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                            <SelectItem value="sarcastic">Sarcastic</SelectItem>
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="sad">Sad</SelectItem>
                            <SelectItem value="calm">Calm</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
