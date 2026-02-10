import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Paperclip, Smile, Check, CheckCheck, Phone, Video, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  image?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    role: "Therapist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Looking forward to our session tomorrow!",
    timestamp: "2 min ago",
    unread: 2,
    online: true
  },
  {
    id: "2",
    name: "Dr. Emily Chen",
    role: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    lastMessage: "Your prescription has been updated",
    timestamp: "1 hour ago",
    unread: 1,
    online: false
  },
  {
    id: "3",
    name: "Voice4Minds Support",
    role: "Support Team",
    image: "",
    lastMessage: "Thank you for reaching out. How can we help?",
    timestamp: "Yesterday",
    unread: 0,
    online: true
  }
];

const sampleMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Sarah Mitchell",
    content: "Hi! I wanted to check in with you before our session tomorrow.",
    timestamp: "10:30 AM",
    isRead: true,
    isOwn: false
  },
  {
    id: "2",
    sender: "You",
    content: "Hi Dr. Mitchell! Yes, I'm feeling a bit anxious about discussing some things.",
    timestamp: "10:32 AM",
    isRead: true,
    isOwn: true
  },
  {
    id: "3",
    sender: "Dr. Sarah Mitchell",
    content: "That's completely understandable. Remember, our sessions are a safe space. Take your time and we'll work through everything together at your pace.",
    timestamp: "10:35 AM",
    isRead: true,
    isOwn: false
  },
  {
    id: "4",
    sender: "Dr. Sarah Mitchell",
    content: "Looking forward to our session tomorrow!",
    timestamp: "10:36 AM",
    isRead: false,
    isOwn: false
  }
];

const MessagesPanel = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages] = useState<Message[]>(sampleMessages);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full rounded-2xl bg-card border border-border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        {/* Conversations List */}
        <div className="border-r border-border bg-secondary/20">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-0 focus-visible:ring-1"
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100%-65px)]">
            <div className="p-2 space-y-1">
              {filteredConversations.map((conv, index) => (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all duration-200 text-left ${
                    selectedConversation?.id === conv.id
                      ? "bg-primary/10 ring-1 ring-primary/20"
                      : "hover:bg-secondary"
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={conv.image} alt={conv.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {conv.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-medium text-sm text-foreground truncate">{conv.name}</span>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-accent text-accent-foreground text-[10px] h-5 w-5 p-0 flex items-center justify-center rounded-full shrink-0">
                      {conv.unread}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col bg-background">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.image} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-background" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{selectedConversation.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.online ? (
                        <span className="text-emerald-600">Online</span>
                      ) : (
                        "Offline"
                      )} • {selectedConversation.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 h-[calc(100%-130px)]">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] ${
                            message.isOwn
                              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                              : "bg-secondary text-foreground rounded-2xl rounded-bl-md"
                          } px-4 py-2.5`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1.5 text-[10px] ${
                              message.isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
                            }`}
                          >
                            <span>{message.timestamp}</span>
                            {message.isOwn && (
                              message.isRead ? (
                                <CheckCheck className="w-3.5 h-3.5" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 rounded-full">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none pr-12 rounded-2xl bg-secondary border-0 focus-visible:ring-1"
                      rows={1}
                    />
                    <Button variant="ghost" size="icon" className="absolute right-2 bottom-1 h-8 w-8">
                      <Smile className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button size="icon" className="shrink-0 rounded-full h-10 w-10">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                  <Send className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Select a conversation
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
