"use client";

import { useEffect, useState } from "react";

type Subscription = {
  id: string;
  name: string;
  cost: number;
  billingCycle: string;
  usageRating: number;
  category: string | null;
  notes: string | null;
  createdAt: string;
};

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    const res = await fetch("/api/subscriptions");
    const data = await res.json();
    setSubscriptions(data.subscriptions || []);
    setLoading(false);
  }

  async function deleteSub(id: string) {
    await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    fetchSubscriptions();
  }

  // Calculate totals
  const monthlySubscriptions = subscriptions.filter((s) => s.billingCycle === "monthly");
  const yearlySubscriptions = subscriptions.filter((s) => s.billingCycle === "yearly");

  const monthlySpend = monthlySubscriptions.reduce((sum, s) => sum + s.cost, 0);
  const yearlySpend = yearlySubscriptions.reduce((sum, s) => sum + s.cost, 0) / 12;
  const totalMonthly = monthlySpend + yearlySpend;
  const totalYearly = totalMonthly * 12;

  // Unused (rated 1-2)
  const unused = subscriptions.filter((s) => s.usageRating <= 2);
  const unusedCost = unused.reduce((sum, s) => {
    return sum + (s.billingCycle === "yearly" ? s.cost / 12 : s.cost);
  }, 0);

  // Recommendations
  const recommendations = subscriptions
    .filter((s) => s.usageRating <= 2)
    .map((s) => `Cancel "${s.name}" - rated ${s.usageRating}/5 usage, costs $${s.cost}/${s.billingCycle}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Freelancer Subscription Cleanup</h1>
          <p className="text-slate-600 mt-1">Track your tools, find wasted spend</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500">Monthly Spend</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">${totalMonthly.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500">Yearly Spend</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">${totalYearly.toFixed(2)}</p>
          </div>
          <div className={`rounded-xl p-6 border ${unused.length > 0 ? "bg-orange-50 border-orange-200" : "bg-white border-slate-200"}`}>
            <p className="text-sm text-orange-700">Potential Savings</p>
            <p className="text-3xl font-bold text-orange-800 mt-2">${unusedCost.toFixed(2)}/mo</p>
            <p className="text-xs text-orange-600 mt-1">{unused.length} unused subscriptions</p>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-orange-200 mb-8">
            <h2 className="text-lg font-semibold text-orange-900 flex items-center gap-2">
              🔥 Cleanup Recommendations
            </h2>
            <ul className="mt-3 space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-orange-800">• {rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Add Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Your Subscriptions</h2>
          <a
            href="/add"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            + Add Subscription
          </a>
        </div>

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
            <p className="text-slate-600">No subscriptions yet. Add your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`bg-white rounded-xl p-4 border ${
                  sub.usageRating <= 2 ? "border-orange-200 bg-orange-50" : "border-slate-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{sub.name}</h3>
                    <p className="text-sm text-slate-500">
                      ${sub.cost}/{sub.billingCycle} • {sub.category || "uncategorized"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-sm font-semibold ${
                        sub.usageRating <= 2 ? "text-orange-600" : "text-emerald-600"
                      }`}>
                        {sub.usageRating}/5
                      </span>
                      <p className="text-xs text-slate-500">usage</p>
                    </div>
                    <button
                      onClick={() => deleteSub(sub.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
