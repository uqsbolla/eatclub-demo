import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/app/types/restaurant";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch data from external API
    const response = await fetch(
      "https://eccdn.com.au/misc/challengedata.json",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    const data: ApiResponse = await response.json();
    const restaurant = data.restaurants.find((r) => r.objectId === id);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Return complete restaurant object
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error("Error in /api/restaurants/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}

