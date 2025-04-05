import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, ArrowRight, Rocket, Code, Users, Shield, Coins } from "lucide-react";

export function RoadmapSection() {
  const [activePhase, setActivePhase] = useState("phase1");
  
  const phases = [
    { id: "phase1", name: "Phase 1", status: "completed", label: "Q1-Q2 2023" },
    { id: "phase2", name: "Phase 2", status: "active", label: "Q3-Q4 2023" },
    { id: "phase3", name: "Phase 3", status: "upcoming", label: "Q1-Q2 2024" },
    { id: "phase4", name: "Phase 4", status: "upcoming", label: "Q3-Q4 2024" },
  ];
  
  const milestones = {
    phase1: [
      { 
        title: "Concept Development", 
        description: "Market research, concept validation, and initial business plan development.",
        icon: <Rocket className="h-5 w-5" />,
        date: "January 2023",
        completed: true
      },
      { 
        title: "Team Formation", 
        description: "Assembled core development team with expertise in blockchain, gaming, and finance.",
        icon: <Users className="h-5 w-5" />,
        date: "February 2023",
        completed: true
      },
      { 
        title: "Technical Architecture", 
        description: "Designed platform architecture and technology stack selection.",
        icon: <Code className="h-5 w-5" />,
        date: "March 2023",
        completed: true
      },
      { 
        title: "Legal Framework", 
        description: "Established legal entity and secured necessary gaming licenses.",
        icon: <Shield className="h-5 w-5" />,
        date: "May 2023",
        completed: true
      }
    ],
    phase2: [
      { 
        title: "Seed Funding Round", 
        description: "Secured $1.5M in seed funding from strategic investors and partners.",
        icon: <Coins className="h-5 w-5" />,
        date: "July 2023",
        completed: true
      },
      { 
        title: "MVP Development", 
        description: "Built minimum viable product with core gaming functionality.",
        icon: <Code className="h-5 w-5" />,
        date: "September 2023",
        completed: true
      },
      { 
        title: "Private Beta Launch", 
        description: "Invite-only beta testing with 500 selected users.",
        icon: <Users className="h-5 w-5" />,
        date: "November 2023",
        completed: false
      },
      { 
        title: "Token Smart Contract", 
        description: "Development and audit of CBT token smart contract.",
        icon: <Shield className="h-5 w-5" />,
        date: "December 2023",
        completed: false
      }
    ],
    phase3: [
      { 
        title: "Pre-Launch Funding Round", 
        description: "Current investment round targeting $5M for platform expansion.",
        icon: <Coins className="h-5 w-5" />,
        date: "January 2024",
        completed: false
      },
      { 
        title: "Platform Expansion", 
        description: "Addition of 50+ games and multi-currency support.",
        icon: <Code className="h-5 w-5" />,
        date: "March 2024",
        completed: false
      },
      { 
        title: "Public Beta", 
        description: "Open beta with full functionality and real crypto transactions.",
        icon: <Users className="h-5 w-5" />,
        date: "April 2024",
        completed: false
      },
      { 
        title: "Token Generation Event", 
        description: "Official launch of CBT token and distribution to investors.",
        icon: <Coins className="h-5 w-5" />,
        date: "June 2024",
        completed: false
      }
    ],
    phase4: [
      { 
        title: "Official Platform Launch", 
        description: "Full public launch with marketing campaign across major channels.",
        icon: <Rocket className="h-5 w-5" />,
        date: "August 2024",
        completed: false
      },
      { 
        title: "Exchange Listings", 
        description: "CBT token listing on major cryptocurrency exchanges.",
        icon: <Coins className="h-5 w-5" />,
        date: "September 2024",
        completed: false
      },
      { 
        title: "Mobile App Release", 
        description: "Native iOS and Android applications for mobile gaming.",
        icon: <Code className="h-5 w-5" />,
        date: "October 2024",
        completed: false
      },
      { 
        title: "Global Expansion", 
        description: "Expansion into additional regulated markets and languages.",
        icon: <Users className="h-5 w-5" />,
        date: "December 2024",
        completed: false
      }
    ]
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-primary text-primary-foreground";
      case "active": return "bg-secondary text-secondary-foreground";
      case "upcoming": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  const getStatusIcon = (completed: boolean) => {
    return completed ? 
      <CheckCircle2 className="h-5 w-5 text-primary" /> : 
      <Clock className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <span className="text-xs font-semibold text-primary">PROJECT TIMELINE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">CryptoBet Roadmap</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our strategic plan for building the next generation crypto casino platform. 
            Invest early in our journey to maximize your returns.
          </p>
        </div>
        
        {/* Desktop Timeline Navigation */}
        <div className="hidden md:block mb-12">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex flex-col items-center relative">
                <button
                  onClick={() => setActivePhase(phase.id)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                    activePhase === phase.id 
                      ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <span className="font-bold">{index + 1}</span>
                </button>
                <span className={`mt-2 font-medium ${activePhase === phase.id ? "text-primary" : "text-muted-foreground"}`}>
                  {phase.name}
                </span>
                <span className="text-xs text-muted-foreground">{phase.label}</span>
                
                {/* Connector Line */}
                {index < phases.length - 1 && (
                  <div className="absolute top-8 left-[calc(100%_-_8px)] w-[calc(100%_+_16px)] h-0.5 bg-muted">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ 
                        width: activePhase === phase.id || phases.findIndex(p => p.id === activePhase) > index 
                          ? "100%" 
                          : "0%" 
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Timeline Navigation */}
        <div className="md:hidden mb-8">
          <Tabs defaultValue="phase1" value={activePhase} onValueChange={setActivePhase}>
            <TabsList className="w-full grid grid-cols-4">
              {phases.map((phase, index) => (
                <TabsTrigger key={phase.id} value={phase.id}>
                  <span className="font-bold">{index + 1}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="text-center mt-4">
            <h3 className="font-medium text-lg">
              {phases.find(p => p.id === activePhase)?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {phases.find(p => p.id === activePhase)?.label}
            </p>
          </div>
        </div>
        
        {/* Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {milestones[activePhase as keyof typeof milestones].map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                milestone.completed ? "border-primary/50 hover:shadow-primary/10" : "hover:shadow-muted/10"
              }`}>
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 p-6">
                    <div className={`p-2 rounded-full ${milestone.completed ? "bg-primary/10" : "bg-muted/50"}`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{milestone.title}</h3>
                        {getStatusIcon(milestone.completed)}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{milestone.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant={milestone.completed ? "default" : "outline"} className="text-xs">
                          {milestone.date}
                        </Badge>
                        {milestone.completed ? (
                          <span className="text-xs text-primary font-medium">Completed</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Next Phase Button */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 group"
            onClick={() => {
              const currentIndex = phases.findIndex(p => p.id === activePhase);
              if (currentIndex < phases.length - 1) {
                setActivePhase(phases[currentIndex + 1].id);
              } else {
                setActivePhase(phases[0].id);
              }
            }}
          >
            View {
              activePhase === phases[phases.length - 1].id 
                ? "First Phase" 
                : "Next Phase"
            }
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}