'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // helper from shadcn

interface ToolCall {
    function: {
        name: string;
        arguments: string;
    };
}

interface Message {
    role: 'user' | 'assistant' | 'system';
    content?: string | null;
    tool_calls?: ToolCall[];
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm your data assistant. You can ask me to filter data by region, category, or switch views." }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Store Actions
    const { setFilter, setViewMode, clearFilters } = useDashboardStore();

    const mutation = useMutation<Message, Error, Message[]>({
        mutationFn: async (newMessages: Message[]): Promise<Message> => {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        },
        onSuccess: (data: Message) => {
            const aiMessage = data;
            setMessages((prev) => [...prev, aiMessage]);

            // Handle Function Calls
            if (aiMessage.tool_calls) {
                aiMessage.tool_calls.forEach((toolCall) => {
                    const fnName = toolCall.function.name;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const args = JSON.parse(toolCall.function.arguments) as any;

                    console.log(`[Agent] Executing tool: ${fnName}`, args);

                    if (fnName === 'filterData') {
                        // Clean up empty args
                        Object.keys(args).forEach(k => args[k] === undefined && delete args[k]);
                        setFilter(args);
                    } else if (fnName === 'changeView') {
                        setViewMode(args.mode as 'table' | 'chart');
                    } else if (fnName === 'clearFilters') {
                        clearFilters();
                    }
                });
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        const newContext = [...messages, userMessage];

        setMessages(newContext);
        setInput('');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutation.mutate(newContext);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Card className="h-[600px] w-full flex flex-col border-neutral-200 dark:border-neutral-800 shadow-lg">
            <CardHeader className="bg-neutral-50 dark:bg-neutral-900 border-b py-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold">AI Assistant</span>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={cn("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "")}>
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                m.role === 'user' ? "bg-neutral-800 text-white" : "bg-purple-100 text-purple-700"
                            )}>
                                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={cn(
                                "rounded-lg px-4 py-2 max-w-[80%] text-sm",
                                m.role === 'user' ? "bg-neutral-800 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
                            )}>
                                {m.content}
                                {m.tool_calls && (
                                    <div className="mt-2 text-xs text-neutral-500 italic border-t pt-1 border-neutral-200 dark:border-neutral-700">
                                        {m.tool_calls.map((t, idx) => (
                                            <div key={idx} className="flex items-center gap-1">
                                                <span>⚡ Executing:</span>
                                                <span className="font-mono bg-neutral-200 dark:bg-neutral-900 px-1 rounded">{t.function.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {mutation.isPending && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-4 py-2 flex items-center gap-1">
                                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-white dark:bg-neutral-950">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask to filter data or change view..."
                            className="flex-1"
                        />
                        <Button type="submit" disabled={mutation.isPending} size="icon">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
