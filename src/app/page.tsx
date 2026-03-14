"use client";

import { useState, useEffect } from "react";

interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: string;
  usageRating: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    billingCycle: "monthly",
    usageRating: "3",
    category: "productivity",
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch("/api/subscriptions");
      const data = await res.json();
      setSubscriptions(data);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchSubscriptions();
        setShowForm(false);
        setFormData({
          name: "",
          cost: "",
          billingCycle: "monthly",
          usageRating: "3",
          category: "productivity",
        });
      }
    } catch (error) {
      console.error("Failed to add subscription:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
      fetchSubscriptions();
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  const calculateMonthlyCost = (sub: Subscription) => {
    return sub.billingCycle === "yearly" ? sub.cost / 12 : sub.cost;
  };

  const totalMonthlySpend = subscriptions.reduce(
    (acc, sub) => acc + calculateMonthlyCost(sub),
    0
  );
  const totalYearlySpend = totalMonthlySpend * 12;

  const unusedSubscriptions = subscriptions.filter(
    (sub) => sub.usageRating <= 2
  );
  const unusedCost = unusedSubscriptions.reduce(
    (acc, sub) => acc + calculateMonthlyCost(sub),
    0
  );

  const getUsageColor = (rating: number) => {
    if (rating <= 2) return "text-red-600 bg-red-50";
    if (rating === 3) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getUsageLabel = (rating: number) => {
    if (rating === 1) return "Never";
    if (rating === 2) return "Rarely";
    if (rating === 3) return "Sometimes";
    if (rating === 4) return "Often";
    return "Daily";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            🧹 Subscription Cleanup
          </h1>
          <p className="text-gray-600 mt-1">
            Track your subscriptions, find the ones you don&apos;t use
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Monthly Spend
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${totalMonthlySpend.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ${totalYearlySpend.toFixed(2)}/year
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Active Subscriptions
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {subscriptions.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {subscriptions.length >= 10 ? (
                <span className="text-amber-600">⚠️ Consider upgrading to Pro</span>
              ) : (
                <span className="text-green-600">✓ Free tier: {10 - subscriptions.length} slots left</span>
              )}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Unused (Rating 1-2)
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {unusedSubscriptions.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ${unusedCost.toFixed(2)}/month wasted
            </p>
          </div>
        </div>

        {unusedSubscriptions.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              💡 Cleanup Recommendations
            </h3>
            <div className="space-y-3">
              {unusedSubscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between bg-white rounded-lg p-4 border border-red-100"
                >
                  <div>
                    <span className="font-medium text-gray-900">{sub.name}</span>
                    <span className="text-gray-500 ml-2">
                      (${sub.cost}/{sub.billingCycle === "monthly" ? "mo" : "yr"})
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Cancel & Save ${calculateMonthlyCost(sub).toFixed(2)}/mo
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Subscriptions
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showForm ? "✕ Cancel" : "+ Add Subscription"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 border mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscription Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Figma, Slack, Notion"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.cost}
                    onChange={(e) =>
                      setFormData({ ...formData, cost: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={formData.billingCycle}
                    onChange={(e) =>
                      setFormData({ ...formData, billingCycle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usage Rating
                  </label>
                  <select
                    value={formData.usageRating}
                    onChange={(e) =>
                      setFormData({ ...formData, usageRating: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 - Never use it</option>
                    <option value="2">2 - Rarely use it</option>
                    <option value="3">3 - Sometimes use it</option>
                    <option value="4">4 - Often use it</option>
                    <option value="5">5 - Use it daily</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="productivity">Productivity</option>
                    <option value="design">Design</option>
                    <option value="communication">Communication</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="development">Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Subscription
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading subscriptions...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-gray-500 text-lg">
              No subscriptions yet. Add your first one!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{sub.name}</div>
                      <div className="text-sm text-gray-500 capitalize">
                        {sub.category}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">${sub.cost.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        /{sub.billingCycle === "monthly" ? "mo" : "yr"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 capitalize">
                      {sub.billingCycle}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUsageColor(
                          sub.usageRating
                        )}`}
                      >
                        {sub.usageRating}/5 - {getUsageLabel(sub.usageRating)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Free tier: {10 - subscriptions.length} slots remaining •{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Upgrade to Pro ($9/mo)
            </a>{" "}
            for unlimited subscriptions
          </p>
        </div>
      </main>
    </div>
  );
}
