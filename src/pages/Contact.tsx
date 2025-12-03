import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or story idea? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-foreground">Email Us</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                hello@historyhub.com
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-secondary/10 w-10 h-10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-serif font-bold text-foreground">Suggest a Story</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Know a fascinating historical event we should cover? Let us know!
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-xl p-6 border border-border">
              <p className="text-sm font-serif italic text-foreground">
                "History is not the past. It is the present. We carry our history with us. We are our history."
              </p>
              <p className="text-xs text-muted-foreground mt-2">— James Baldwin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What's this about?"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
