import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ subscriptions });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    cost?: number;
    billingCycle?: string;
    usageRating?: number;
    category?: string;
    notes?: string;
  };

  if (!body.name || body.cost === undefined || !body.billingCycle || !body.usageRating) {
    return NextResponse.json(
      { error: "name, cost, billingCycle, and usageRating are required" },
      { status: 400 }
    );
  }

  const subscription = await prisma.subscription.create({
    data: {
      name: body.name,
      cost: body.cost,
      billingCycle: body.billingCycle,
      usageRating: body.usageRating,
      category: body.category || null,
      notes: body.notes || null,
    },
  });

  return NextResponse.json({ subscription }, { status: 201 });
}
