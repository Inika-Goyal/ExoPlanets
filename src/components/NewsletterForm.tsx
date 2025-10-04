import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive updates about cosmic discoveries.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 mt-16 text-center">
      <h2 className="text-white text-2xl font-semibold mb-4">
        Stay Updated on Cosmic Discoveries
      </h2>
      <p className="text-slate-300 mb-6">
        Subscribe to receive the latest news about space exploration and astronomical breakthroughs.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto max-md:flex-col">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white"
          required
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </section>
  );
};
