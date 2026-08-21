'use client';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/card';

const forecast = [
  { day: 'Jun', historical: 1.4, forecast: 1.4 },
  { day: 'Jul', historical: 1.32, forecast: 1.32 },
  { day: 'Aug', historical: 1.26, forecast: 1.26 },
  { day: 'Sep', historical: null, forecast: 1.21 },
  { day: 'Oct', historical: null, forecast: 1.15 },
  { day: 'Nov', historical: null, forecast: 1.08 },
];

const steps = [
  { name: 'Ledger Balancing', completion: 80 },
  { name: 'Intercompany Eliminations', completion: 100 },
  { name: 'Tax Accruals', completion: 45 },
];

export function FluxbotDashboard() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Runway (Months)', '18.2'],
          ['Net Burn Rate', '$62.5K'],
          ['Available Liquidity', '$1.265M'],
          ['DSO', '34 Days'],
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold">Month-End Readiness Score</h2>
          <p className="mt-3 text-5xl font-bold text-emerald-400">86%</p>
          <p className="mt-2 text-sm text-slate-400">Real-time close confidence based on reconciliations and control checks.</p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Close Progress</h2>
          <ul className="mt-4 space-y-3">
            {steps.map((step) => (
              <li key={step.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{step.name}</span>
                  <span>{step.completion}%</span>
                </div>
                <div className="h-2 rounded bg-slate-700">
                  <div className="h-2 rounded bg-cyan-400" style={{ width: `${step.completion}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">One-Click Close</h2>
          <button className="mt-4 w-full rounded bg-emerald-500 px-4 py-2 font-semibold text-slate-900">Execute Close</button>
          <p className="mt-3 text-xs text-amber-300">Latest validation: Tax accrual variance exceeds tolerance.</p>
        </Card>
      </section>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">90-Day Predictive Cash Flow</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Line type="monotone" dataKey="historical" stroke="#22d3ee" strokeWidth={3} />
              <Line type="monotone" dataKey="forecast" stroke="#34d399" strokeDasharray="6 6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </main>
  );
}
