"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Edit2,
  Globe,
  MessageSquare,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationHeaderProps {
  conversation: Conversation;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
}

export function ConversationHeader({
  conversation,
  onRename,
  onDelete,
}: ConversationHeaderProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handleRename = () => {
    if (newTitle.trim() !== "") {
      onRename(newTitle.trim());
      setIsRenaming(false);
    }
  };

  const handleCancel = () => {
    setIsRenaming(false);
    setNewTitle(conversation.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-background">
      <CardHeader className="pb-2 pt-6 px-8">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isRenaming ? (
              <motion.div
                key="rename-input"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center w-full space-x-2"
              >
                <Input
                  ref={inputRef}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow text-2xl font-semibold bg-background border-b-2 border-primary rounded-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                  placeholder="Enter new title"
                />
                <Button
                  onClick={handleRename}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary rounded-full"
                >
                  <Check className="h-5 w-5" />
                  <span className="sr-only">Save new title</span>
                </Button>
                <Button
                  onClick={handleCancel}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-destructive/10 hover:text-destructive rounded-full"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Cancel renaming</span>
                </Button>
              </motion.div>
            ) : (
              <motion.h2
                key="conversation-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold truncate text-foreground flex-grow pr-4"
              >
                {conversation.title}
              </motion.h2>
            )}
          </AnimatePresence>
          {!isRenaming && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setIsRenaming(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-8">
        <Separator className="my-4" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <Badge
            variant="secondary"
            className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:bg-primary/20"
          >
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            <span>{conversation.meta?.model}</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center space-x-1 hover:bg-secondary/80 transition-all px-3 py-1.5 rounded-full text-sm"
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
            <span>{conversation.meta?.tone}</span>
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center space-x-1 hover:bg-secondary/80 transition-all px-3 py-1.5 rounded-full text-sm"
          >
            <Globe className="h-3.5 w-3.5 mr-1.5" />
            <span>{conversation.meta?.language}</span>
          </Badge>
        </motion.div>
      </CardContent>
    </Card>
  );
}
