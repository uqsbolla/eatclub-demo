import { NextRequest, NextResponse } from "next/server";
import type {
  RawRestaurant,
  Restaurant,
  ApiResponse,
} from "@/app/types/restaurant";

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

    // Helper function to get the best deal for a restaurant
    const getBestDeal = (deals: any[]) => {
      if (!deals || deals.length === 0) return null;
      return deals.reduce((best, current) =>
        parseInt(current.discount) > parseInt(best.discount) ? current : best
      );
    };

    // Sort by best deal (highest discount first)
    restaurants.sort((a, b) => {
      const getBestDiscount = (restaurant: RawRestaurant) => {
        if (!restaurant.deals || restaurant.deals.length === 0) return 0;
        return Math.max(
          ...restaurant.deals.map((deal) => parseInt(deal.discount))
        );
      };

      return getBestDiscount(b) - getBestDiscount(a);
    });

    // Return optimized data with only the best deal and pre-computed distance
    const optimizedRestaurants: Restaurant[] = restaurants.map((restaurant) => {
      const bestDeal = getBestDeal(restaurant.deals);
      return {
        objectId: restaurant.objectId,
        name: restaurant.name,
        suburb: restaurant.suburb,
        cuisines: restaurant.cuisines,
        imageLink: restaurant.imageLink,
        bestDeal: bestDeal
          ? {
              objectId: bestDeal.objectId,
              discount: bestDeal.discount,
              dineIn: bestDeal.dineIn,
              open: bestDeal.open,
              close: bestDeal.close,
              qtyLeft: bestDeal.qtyLeft,
            }
          : null,
        distance: "0.5km Away",
      };
    });

    return NextResponse.json(optimizedRestaurants);
  } catch (error) {
    console.error("Error in /api/restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
