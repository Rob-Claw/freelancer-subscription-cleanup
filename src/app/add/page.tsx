"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSubscription() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    cost: "",
    billingCycle: "monthly",
    usageRating: "3",
    category: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        cost: parseFloat(form.cost),
        billingCycle: form.billingCycle,
        usageRating: parseInt(form.usageRating),
        category: form.category || null,
        notes: form.notes || null,
      }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to add subscription");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <a href="/" className="text-emerald-600 hover:underline">← Back to Dashboard</a>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">Add Subscription</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name *</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="e.g., Figma, Slack, Notion"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Cost *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="9.99"
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Billing Cycle *</label>
              <select
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
                value={form.billingCycle}
                onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Usage Rating * <span className="text-slate-500">(1 = unused, 5 = daily use)</span>
            </label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setForm({ ...form, usageRating: String(rating) })}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    form.usageRating === String(rating)
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <select
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="productivity">Productivity</option>
              <option value="design">Design</option>
              <option value="communication">Communication</option>
              <option value="finance">Finance</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
              rows={3}
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Subscription"}
          </button>
        </form>
      </main>
    </div>
  );
}
