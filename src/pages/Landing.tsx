
import heroImage from '@/assets/hero-ink.jpg';
import CountdownTimer from '@/components/features/CountdownTimer';
import EarningsCalculator from '@/components/features/EarningsCalculator';
import WaitlistForm from '@/components/forms/WaitlistForm';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-32 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-emerald-900/30 border border-emerald-700/50 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">Coming Soon</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Be the Poet You Want to Be—
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              Finally.
            </span>
          </h1>
          
          <div className="mt-12">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 leading-tight">
            It's hard to get your poetry seen.
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            Recognition is rare, paying opportunities are almost non-existent, and most platforms leave you feeling like your words don't matter. You share your heart, your craft, your voice… and too often, it disappears into the void.
          </p>
        </div>
      </section>

      {/* Agitate Section */}
      <section className="py-16 sm:py-24 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Sound Familiar?</h2>
          </div>
          
          <div className="space-y-6">
            {[
              'How many poems have you written that deserved claps, praise, or even a little reward—but went unnoticed?',
              'How many times have you wanted feedback from someone who truly understands poetry—but couldn\'t find it?',
              'How many times have you dreamed of a space that\'s truly yours, where your words earn recognition, followers, and yes—even money—but felt stuck?',
            ].map((question, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-l-4 border-emerald-500 p-6 rounded-r-lg"
              >
                <p className="text-slate-200 text-lg sm:text-xl italic">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solve Section */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              That's why <span className="text-emerald-400">WordStack</span> is coming.
            </h2>
            <p className="text-xl text-slate-300">
              A platform <strong>built for poets, by poets</strong>, giving you:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ownership & Control</h3>
              <p className="text-slate-300">
                Your poet page, your rules. Create groups, invite members, or join communities you love.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">WordGuides & Critique</h3>
              <p className="text-slate-300">
                Experienced reviewers help you improve your craft before your poems go live. Rate their feedback and shape the platform.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Earn Ink & Money</h3>
              <p className="text-slate-300">
                Readers give you Ink for your poems. 1 clap = 1 Ink = $0.01. Boost poems, unlock features, or convert Ink to USD.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Daily Rewards & Contests</h3>
              <p className="text-slate-300">
                5 free Ink per day (up to 25 per month), contests, and Top Poem selections to maximize your earnings.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-8 md:col-span-2">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">5</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Recognition & Followers</h3>
              <p className="text-slate-300">
                Build your audience, be celebrated, and connect with poets worldwide.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-900/20 to-slate-900/20 border border-emerald-700/50 rounded-2xl p-8 text-center">
            <p className="text-xl sm:text-2xl text-white mb-2">
              No monthly subscriptions.
            </p>
            <p className="text-lg text-slate-300">
              Just <strong className="text-emerald-400">Ink—the currency of your poetry</strong>, powering your growth and rewards.
            </p>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-16 sm:py-24 px-6 bg-slate-900/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See Your Potential
            </h2>
            <p className="text-slate-300">
              Calculate how much your poems could earn in Ink and USD
            </p>
          </div>
          
          <EarningsCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Reserve Your Poet Page
            </h2>
            <p className="text-lg text-slate-300">
              Sign up now to join the early user list and be the first notified when WordStack launches.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 mb-2">
            WordStack
          </h3>
          <p className="text-slate-400 text-sm">Unlike Others</p>
          <p className="text-slate-500 text-xs mt-4">&copy; {new Date().getFullYear()} WordStack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
