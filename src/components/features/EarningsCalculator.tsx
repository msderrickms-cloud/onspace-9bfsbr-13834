import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

export default function EarningsCalculator() {
  const [poemsPerMonth, setPoemsPerMonth] = useState(10);
  const [clapsPerPoem, setClapsPerPoem] = useState(50);

  const monthlyInk = poemsPerMonth * clapsPerPoem;
  const monthlyUSD = monthlyInk * 0.01;
  const yearlyUSD = monthlyUSD * 12;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Earnings Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-slate-300">Poems per Month</label>
            <span className="text-lg font-semibold text-white">{poemsPerMonth}</span>
          </div>
          <Slider
            value={[poemsPerMonth]}
            onValueChange={(value) => setPoemsPerMonth(value[0])}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm text-slate-300">Avg Claps per Poem</label>
            <span className="text-lg font-semibold text-white">{clapsPerPoem}</span>
          </div>
          <Slider
            value={[clapsPerPoem]}
            onValueChange={(value) => setClapsPerPoem(value[0])}
            max={500}
            min={1}
            step={5}
            className="w-full"
          />
        </div>

        <div className="border-t border-slate-700 pt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Monthly Ink</span>
            <span className="text-xl font-bold text-emerald-400">{monthlyInk.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Monthly Earnings</span>
            <span className="text-2xl font-bold text-white">${monthlyUSD.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Potential Yearly</span>
            <span className="text-lg font-semibold text-emerald-400">${yearlyUSD.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          1 Clap = 1 Ink = $0.01 USD
        </p>
      </div>
    </div>
  );
}
