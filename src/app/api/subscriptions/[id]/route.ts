import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });

  if (!subscription) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(subscription);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const subscription = await prisma.subscription.update({
    where: { id },
    data: {
      name: body.name,
      cost: parseFloat(body.cost),
      billingCycle: body.billingCycle,
      usageRating: parseInt(body.usageRating),
      category: body.category,
    },
  });

  return NextResponse.json(subscription);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.subscription.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
