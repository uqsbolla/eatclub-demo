import { NextRequest, NextResponse } from "next/server";
import type { Restaurant, ApiResponse } from "@/app/types/restaurant";

export async function GET(request: NextRequest) {
  try {
    // Get search query parameter
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q")?.toLowerCase() || "";

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
    let restaurants = data.restaurants;

    // Filter by search term if provided
    if (searchTerm) {
      restaurants = restaurants.filter((restaurant) => {
        const nameMatch = restaurant.name.toLowerCase().includes(searchTerm);
        const cuisineMatch = restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchTerm)
        );
        return nameMatch || cuisineMatch;
      });
    }

    // Sort by best deal (highest discount first)
    restaurants.sort((a, b) => {
      const getBestDiscount = (restaurant: Restaurant) => {
        if (!restaurant.deals || restaurant.deals.length === 0) return 0;
        return Math.max(...restaurant.deals.map((deal) => parseInt(deal.discount)));
      };

      return getBestDiscount(b) - getBestDiscount(a);
    });

    // Return only the fields currently being rendered
    const filteredRestaurants = restaurants.map((restaurant) => ({
      objectId: restaurant.objectId,
      name: restaurant.name,
      address1: restaurant.address1,
      suburb: restaurant.suburb,
      cuisines: restaurant.cuisines,
      imageLink: restaurant.imageLink,
      deals: restaurant.deals.map((deal) => ({
        objectId: deal.objectId,
        discount: deal.discount,
        dineIn: deal.dineIn,
        open: deal.open,
        close: deal.close,
        qtyLeft: deal.qtyLeft,
      })),
    }));

    return NextResponse.json(filteredRestaurants);
  } catch (error) {
    console.error("Error in /api/restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

