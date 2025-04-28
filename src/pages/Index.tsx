
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#c4b5fd,transparent)]"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                <span className="vibely-gradient-text">Connect</span>, <span className="vibely-gradient-text">Share</span> & <span className="vibely-gradient-text">Chat</span> in Real-time
              </h1>
              <p className="text-xl text-muted-foreground">
                A social media platform with seamless real-time messaging. Share posts, connect with friends, and chat instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/home">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <a href="#features">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-10">
              <div className="w-full h-[400px] overflow-hidden rounded-xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop"
                  alt="Vibely App Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-xl shadow-lg bg-white p-2 rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop"
                  alt="Vibely Chat"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed to provide the best social media experience with real-time communication
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Social Feed",
                description: "Share posts, photos, and updates with your network. Like and comment on content.",
                icon: "🌟",
              },
              {
                title: "Real-time Chat",
                description: "Instant messaging with friends and groups. See when others are typing.",
                icon: "💬",
              },
              {
                title: "User Profiles",
                description: "Customize your profile, showcase your posts, and build your online presence.",
                icon: "👤",
              },
              {
                title: "Friend Connections",
                description: "Discover and connect with friends. Build your personal network.",
                icon: "🔗",
              },
              {
                title: "Notifications",
                description: "Stay updated with activities and interactions from your connections.",
                icon: "🔔",
              },
              {
                title: "Responsive Design",
                description: "Enjoy a seamless experience across all your devices, from mobile to desktop.",
                icon: "📱",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Project Timeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our development roadmap from concept to launch
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                week: "Week 1",
                title: "Backend Setup",
                description: "Setting up the backend infrastructure and designing the database schema",
              },
              {
                week: "Week 2",
                title: "Core Social Features",
                description: "Developing user posts, comment sections, and likes functionality",
              },
              {
                week: "Week 3",
                title: "Real-time Chat",
                description: "Implementing real-time chat with WebSocket integration",
              },
              {
                week: "Week 4",
                title: "Deployment & Optimization",
                description: "Deploying the app, optimizing performance, and adding final touches",
              },
            ].map((phase, i) => (
              <div key={i} className="flex gap-4 md:gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full vibely-gradient flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  {i < 3 && <div className="w-0.5 grow bg-gray-200 my-2"></div>}
                </div>
                <div className="pt-1.5">
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-3">
                      {phase.week}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{phase.title}</h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,#c4b5fd,transparent)]"></div>
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Connected?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join Vibely today and experience the future of social networking with built-in real-time communication.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/home">Start Exploring</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full vibely-gradient"></div>
              <span className="text-xl font-bold vibely-gradient-text">Vibely</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
              <a href="#" className="text-muted-foreground hover:text-foreground">About Us</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Features</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vibely. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
