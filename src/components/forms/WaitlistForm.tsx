import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { WaitlistEntry } from '@/types/waitlist';

export default function WaitlistForm() {
  const [formData, setFormData] = useState<WaitlistEntry>({
    name: '',
    email: '',
    poet_handle: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting waitlist form:', formData);

    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          poet_handle: formData.poet_handle || null,
        },
      ]);

    if (error) {
      console.error('Waitlist submission error:', error);
      toast({
        title: 'Error',
        description: error.message.includes('duplicate')
          ? 'This email is already registered!'
          : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    console.log('Waitlist submission successful');
    setSubmitted(true);
    toast({
      title: 'Welcome to the WordStack family!',
      description: "We'll notify you when we launch.",
    });
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-gradient-to-br from-emerald-900/20 to-slate-900/20 border border-emerald-700/50 rounded-2xl">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
        <p className="text-slate-300">
          We'll send you launch updates—no spam, just poetry.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
      <div>
        <Label htmlFor="name" className="text-slate-200">
          Your Name *
        </Label>
        <Input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1.5 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-slate-200">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1.5 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
          placeholder="poet@example.com"
        />
      </div>

      <div>
        <Label htmlFor="poet_handle" className="text-slate-200">
          Poet Name / Handle <span className="text-slate-500">(Optional)</span>
        </Label>
        <Input
          id="poet_handle"
          type="text"
          value={formData.poet_handle}
          onChange={(e) => setFormData({ ...formData, poet_handle: e.target.value })}
          className="mt-1.5 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
          placeholder="@yourpoetname"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-6 text-lg"
      >
        {loading ? 'Joining...' : 'Reserve Your Poet Page'}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        We'll only send launch updates—no spam, just poetry.
      </p>
    </form>
  );
}
