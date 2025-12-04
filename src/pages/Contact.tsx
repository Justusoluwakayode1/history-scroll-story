import { useState } from "react";
import { Mail, MessageSquare, Send, Sparkles, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(250,40%,25%)] via-[hsl(260,35%,30%)] to-[hsl(270,30%,28%)]">
      <Header />
      
      {/* Hero Section - Deep Blue/Purple Theme */}
      <section className="relative overflow-hidden border-b border-[hsl(250,40%,35%)] bg-gradient-to-br from-[hsl(250,40%,28%)] via-[hsl(260,35%,32%)] to-[hsl(270,30%,30%)]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image.jpg" 
            alt="Contact" 
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(250,40%,28%)] via-[hsl(260,35%,32%)] to-[hsl(270,30%,30%)]" />
        </div>
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-10 left-10 text-6xl">✉️</div>
          <div className="absolute bottom-10 right-10 text-6xl">💌</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">📬</div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="rounded-full bg-white/20 backdrop-blur p-3 border border-white/30">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white drop-shadow-lg">
                Contact Us
              </h1>
            </div>
            <p className="text-lg text-white/95 max-w-2xl mx-auto drop-shadow">
              Have a question, suggestion, or story idea? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-[hsl(250,40%,25%)]/20 w-12 h-12 flex items-center justify-center group-hover:bg-[hsl(250,40%,25%)]/30 transition-colors border-2 border-[hsl(250,40%,25%)]/30">
                  <Mail className="h-6 w-6 text-[hsl(250,40%,25%)]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[hsl(250,40%,20%)]">Email Us</h3>
              </div>
              <p className="text-[hsl(250,40%,30%)] mb-2">Send us an email anytime</p>
              <a href="mailto:hello@historyhub.com" className="text-[hsl(250,40%,25%)] hover:text-[hsl(250,40%,20%)] font-medium transition-colors">
                hello@historyhub.com
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-[hsl(260,35%,30%)]/20 w-12 h-12 flex items-center justify-center group-hover:bg-[hsl(260,35%,30%)]/30 transition-colors border-2 border-[hsl(260,35%,30%)]/30">
                  <Sparkles className="h-6 w-6 text-[hsl(260,35%,25%)]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[hsl(250,40%,20%)]">Suggest a Story</h3>
              </div>
              <p className="text-[hsl(250,40%,30%)] leading-relaxed">
                Know a fascinating historical event we should cover? Have a story idea? 
                We're always looking for new topics to explore!
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-[hsl(270,30%,28%)]/20 w-12 h-12 flex items-center justify-center group-hover:bg-[hsl(270,30%,28%)]/30 transition-colors border-2 border-[hsl(270,30%,28%)]/30">
                  <Clock className="h-6 w-6 text-[hsl(270,30%,25%)]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[hsl(250,40%,20%)]">Response Time</h3>
              </div>
              <p className="text-[hsl(250,40%,30%)] leading-relaxed">
                We typically respond within 24-48 hours. Thank you for your patience!
              </p>
            </div>

            {/* Quote Card */}
            <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-20">
                <Sparkles className="h-12 w-12 text-[hsl(260,35%,30%)]" />
              </div>
              <div className="relative z-10">
                <p className="text-base font-serif italic text-[hsl(250,40%,25%)] leading-relaxed mb-3">
                  "History is not the past. It is the present. We carry our history with us. We are our history."
                </p>
                <p className="text-xs text-[hsl(250,40%,35%)] font-medium">— James Baldwin</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 shadow-elegant">
            <h2 className="text-2xl font-serif font-bold text-[hsl(250,40%,20%)] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[hsl(250,40%,25%)] mb-2 block">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="h-11 border-[hsl(250,40%,40%)]/30 focus:border-[hsl(250,40%,25%)]"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[hsl(250,40%,25%)] mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="h-11 border-[hsl(250,40%,40%)]/30 focus:border-[hsl(250,40%,25%)]"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[hsl(250,40%,25%)] mb-2 block">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What's this about?"
                  className="h-11 border-[hsl(250,40%,40%)]/30 focus:border-[hsl(250,40%,25%)]"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[hsl(250,40%,25%)] mb-2 block">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more..."
                  rows={6}
                  className="resize-none border-[hsl(250,40%,40%)]/30 focus:border-[hsl(250,40%,25%)]"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-[hsl(250,40%,25%)] hover:bg-[hsl(250,40%,30%)] text-white gap-2 font-medium"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
