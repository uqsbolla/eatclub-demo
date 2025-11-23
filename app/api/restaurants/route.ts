import { NextRequest, NextResponse } from "next/server";
import { getRestaurants } from "@/lib/restaurantData";

export async function GET(request: NextRequest) {
  try {
    // Get search query parameter
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q") || "";

    // Use shared data fetching and transformation logic
    const restaurants = await getRestaurants(searchTerm);

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Error in /api/restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
