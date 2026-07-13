"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, ScanFace, Grid3x3, Code2, Send, Loader2 } from "lucide-react";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/effects/fade-in";

export function AILab() {
  return (
    <section id="ai-lab" className="scroll-mt-8 py-2">
      <SectionHeading id="ai-lab-heading" title="AI Sandbox & Lab" />
      <p className="mb-8 text-sm text-muted-foreground">
        A visual gallery showcasing my deep learning models and interactive AI applications.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Python Assistant (Flowise + Gemini) */}
        <FadeIn delay={0.1}>
          <InteractivePythonAssistant />
        </FadeIn>

        <div className="grid gap-6 grid-rows-2">
          {/* Face Mask Detection CNN */}
          <FadeIn delay={0.2} className="h-full">
            <CrochetCard hover className="tatreez-accent flex h-full flex-col p-0 overflow-hidden">
              <div className="flex h-full">
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <ScanFace className="h-4 w-4 text-tatreez-red" />
                    <h3 className="font-medium text-sm">Face Mask CNN</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Convolutional Neural Network for real-time face mask detection.
                  </p>
                  <div className="flex gap-1.5 flex-wrap mt-auto">
                    <span className="glass-pill px-2 py-0.5 text-[10px]">PyTorch</span>
                    <span className="glass-pill px-2 py-0.5 text-[10px]">Computer Vision</span>
                  </div>
                </div>
                
                {/* Visual Representation */}
                <div className="w-1/2 bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)', backgroundSize: '12px 12px' }}></div>
                  {/* Cyber-Tatreez Bounding Box */}
                  <motion.div 
                    className="relative w-20 h-24 border-2 border-dashed border-tatreez-red shadow-[0_0_15px_rgba(228,49,43,0.3)] bg-tatreez-red/5 flex items-start justify-end p-1"
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="bg-tatreez-red text-background text-[8px] font-bold px-1 py-0.5 rounded-sm">Mask 98%</span>
                    
                    {/* Cross stitches on corners */}
                    <span className="absolute -top-2 -left-2 text-tatreez-red text-xs font-mono">x</span>
                    <span className="absolute -top-2 -right-2 text-tatreez-red text-xs font-mono">x</span>
                    <span className="absolute -bottom-2 -left-2 text-tatreez-red text-xs font-mono">x</span>
                    <span className="absolute -bottom-2 -right-2 text-tatreez-red text-xs font-mono">x</span>
                  </motion.div>
                </div>
              </div>
            </CrochetCard>
          </FadeIn>

          {/* DCGAN MNIST Generator */}
          <FadeIn delay={0.3} className="h-full">
            <CrochetCard hover className="tatreez-accent flex h-full flex-col p-0 overflow-hidden">
              <div className="flex h-full flex-row-reverse">
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Grid3x3 className="h-4 w-4 text-foreground" />
                    <h3 className="font-medium text-sm">DCGAN Generator</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Deep Convolutional GAN generating handwritten digits (MNIST).
                  </p>
                  <div className="flex gap-1.5 flex-wrap mt-auto">
                    <span className="glass-pill px-2 py-0.5 text-[10px]">TensorFlow</span>
                    <span className="glass-pill px-2 py-0.5 text-[10px]">GANs</span>
                  </div>
                </div>
                
                {/* Visual Representation */}
                <div className="w-1/2 bg-foreground/5 flex items-center justify-center p-3 border-r border-border/50">
                  <div className="grid grid-cols-3 gap-1 w-full aspect-square">
                    {[...Array(9)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        className="bg-foreground rounded-sm"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2,
                          ease: "linear"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CrochetCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function InteractivePythonAssistant() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: React.ReactNode }[]>([
    {
      role: "user",
      content: "Write a python script to reverse a string",
    },
    {
      role: "ai",
      content: (
        <>
          <p className="mb-2">Here is a simple way to reverse a string in Python using slicing:</p>
          <div className="bg-background rounded p-2 border border-border font-mono text-[10px] text-muted-foreground">
            <span className="text-tatreez-red">def</span> <span className="text-tatreez-green">reverse_string</span>(s):<br/>
            &nbsp;&nbsp;<span className="text-tatreez-red">return</span> s[::-1]
          </div>
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: (
            <>
              <p className="mb-2">That's an interesting question! For this portfolio demo, I can show you how to print hello world:</p>
              <div className="bg-background rounded p-2 border border-border font-mono text-[10px] text-muted-foreground">
                <span className="text-tatreez-green">print</span>(<span className="text-tatreez-red">"Hello, World!"</span>)
              </div>
            </>
          ),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <CrochetCard hover className="tatreez-accent relative flex h-[350px] md:h-full flex-col overflow-hidden p-0">
      <div className="border-b border-border bg-muted/50 px-4 py-3 flex items-center gap-2">
        <Bot className="h-4 w-4 text-tatreez-green" />
        <h3 className="font-medium text-sm">Python Assistant</h3>
        <span className="ml-auto glass-pill px-2 py-0.5 text-[10px]">Gemini + Flowise</span>
      </div>
      
      <div className="p-4 flex flex-col gap-3 flex-1 bg-background/50 overflow-y-auto overflow-x-hidden" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user"
                ? "self-end rounded-2xl rounded-tr-sm bg-muted px-3 py-2 text-xs text-foreground max-w-[80%]"
                : "self-start rounded-2xl rounded-tl-sm bg-foreground/5 border border-tatreez-green/20 px-3 py-2 text-xs text-foreground max-w-[90%] shadow-[0_0_10px_rgba(20,153,84,0.1)]"
            }
          >
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div className="self-start rounded-2xl rounded-tl-sm bg-foreground/5 border border-tatreez-green/20 px-3 py-3 text-xs text-foreground max-w-[90%] shadow-[0_0_10px_rgba(20,153,84,0.1)] flex items-center gap-1">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-tatreez-green" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
            <motion.div className="w-1.5 h-1.5 rounded-full bg-tatreez-green" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
            <motion.div className="w-1.5 h-1.5 rounded-full bg-tatreez-green" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Python..."
            className="flex-1 bg-muted border border-border/50 rounded-full px-4 py-1.5 text-xs focus:outline-none focus:border-tatreez-green/50"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-foreground text-background p-1.5 rounded-full disabled:opacity-50 transition-transform active:scale-95"
          >
            {isTyping ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
          </button>
        </div>
      </form>
    </CrochetCard>
  );
}
