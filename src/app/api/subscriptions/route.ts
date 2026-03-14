import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(subscriptions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, cost, billingCycle, usageRating, category } = body;

  const subscription = await prisma.subscription.create({
    data: {
      name,
      cost: parseFloat(cost),
      billingCycle: billingCycle || "monthly",
      usageRating: parseInt(usageRating) || 3,
      category: category || "other",
    },
  });

  return NextResponse.json(subscription);
}
