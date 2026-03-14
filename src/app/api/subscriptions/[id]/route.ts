import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = (await request.json()) as {
    name?: string;
    cost?: number;
    billingCycle?: string;
    usageRating?: number;
    category?: string;
    notes?: string;
  };

  const subscription = await prisma.subscription.update({
    where: { id },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.cost !== undefined && { cost: body.cost }),
      ...(body.billingCycle && { billingCycle: body.billingCycle }),
      ...(body.usageRating && { usageRating: body.usageRating }),
      ...(body.category && { category: body.category }),
      ...(body.notes !== undefined && { notes: body.notes }),
    },
  });

  return NextResponse.json({ subscription });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.subscription.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
