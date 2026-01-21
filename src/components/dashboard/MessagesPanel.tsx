import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Paperclip, Smile, Check, CheckCheck, Phone, Video, MoreVertical, Star, Archive, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: string;
  senderImage?: string;
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
    name: "MindfulPath Support",
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
    <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
        {/* Conversations List */}
        <div className="border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-display text-lg font-semibold mb-3">Messages</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-0"
              />
            </div>
          </div>
          
          <ScrollArea className="h-[520px]">
            <div className="p-2">
              {filteredConversations.map((conv, index) => (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all duration-200 text-left ${
                    selectedConversation?.id === conv.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-background">
                      <AvatarImage src={conv.image} alt={conv.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {conv.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground truncate">{conv.name}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-accent text-accent-foreground text-xs px-2 py-0.5">
                      {conv.unread}
                    </Badge>
                  )}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.image} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedConversation.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.online ? "Online" : "Offline"} • {selectedConversation.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
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
                          className={`max-w-[80%] ${
                            message.isOwn
                              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
                              : "bg-secondary text-foreground rounded-2xl rounded-bl-sm"
                          } px-4 py-3`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                              message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            <span>{message.timestamp}</span>
                            {message.isOwn && (
                              message.isRead ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
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
              <div className="p-4 border-t border-border bg-secondary/20">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none pr-12 bg-background border-border"
                      rows={1}
                    />
                    <Button variant="ghost" size="icon" className="absolute right-2 bottom-1">
                      <Smile className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button size="icon" className="shrink-0 rounded-full h-11 w-11">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Send className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
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
