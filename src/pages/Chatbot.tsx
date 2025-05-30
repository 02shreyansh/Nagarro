import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4 max-w-xs">
      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 space-y-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isLast }: { message: Message; isLast: boolean }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`flex items-end space-x-2 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} 
        opacity-0 animate-in slide-in-from-bottom-2 duration-500 ease-out`}
      style={{ 
        animationFillMode: 'forwards',
        animationDelay: isLast ? '0ms' : '100ms'
      }}
    >
      {/* Avatar */}
      <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-r from-green-500 to-blue-500' 
          : 'bg-gradient-to-r from-blue-500 to-purple-600'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Message Bubble */}
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' 
            : 'bg-gray-100 text-gray-900 rounded-bl-md hover:bg-gray-50 transition-colors duration-200'
        } shadow-sm`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div className={`text-xs mt-2 opacity-70 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

const AIMessageSkeleton = () => {
  return (
    <div className="flex items-end space-x-2 mb-4">
      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate AI response based on user input
      const responses = [
        "That's an interesting question! Let me think about that for you.",
        "I understand what you're asking. Here's my perspective on that topic.",
        "Great point! I'd be happy to help you with that.",
        "Thanks for sharing that with me. Here's what I think about it.",
        "I see what you mean. Let me provide you with some insights.",
        "That's a thoughtful question. I'll do my best to give you a helpful response.",
        "I appreciate you asking that. Here's how I would approach this topic."
      ];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedPrompts = [
    "What can you help me with?",
    "Tell me about artificial intelligence",
    "How do you work?",
    "What are your capabilities?"
  ];

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <Card className="border-0 border-b rounded-none shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 relative">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4 space-y-1">
            {messages.map((message, index) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                isLast={index === messages.length - 1}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            {isLoading && !isTyping && <AIMessageSkeleton />}
            
            {/* Suggested Prompts (only show when no messages except initial) */}
            {messages.length === 1 && !isLoading && (
              <div className="mt-8 space-y-3">
                <p className="text-sm text-gray-500 text-center">Try asking me about:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto py-3 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200 rounded-xl transition-all duration-200 hover:shadow-sm"
                      onClick={() => handlePromptClick(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <Card className="border-0 border-t rounded-none shadow-lg bg-white/90 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="min-h-[44px] max-h-[120px] resize-none border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-colors duration-200 pr-12"
                disabled={isLoading}
                rows={1}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {inputValue.length > 0 && (
                  <span className="bg-white px-1 rounded">
                    {inputValue.length}
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            Press Enter to send • Shift + Enter for new line
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatbotInterface;