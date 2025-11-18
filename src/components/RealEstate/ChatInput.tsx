import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSend: (query: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSend(query);
      setQuery("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something like: Analyze Wakad or Compare Baner and Aundh"
            className="flex-1 h-12 text-base border-2 border-input focus:border-primary transition-all"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6 bg-primary hover:bg-primary/90 transition-all"
            disabled={isLoading || !query.trim()}
          >
            <Send className="mr-2" size={20} />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
