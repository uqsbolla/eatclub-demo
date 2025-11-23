import { RestaurantDetailPage } from "./_components/RestaurantDetailPage";
import { getRestaurantById } from "@/lib/restaurantData";
import type { RawRestaurant } from "@/types/restaurant";
import { notFound } from "next/navigation";

async function fetchRestaurantDetails(
  id: string
): Promise<RawRestaurant | null> {
  try {
    // Directly use shared data fetching logic (no API route needed)
    return await getRestaurantById(id);
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return null;
  }
}

// Enable dynamic rendering with caching
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

export default async function RestaurantDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await fetchRestaurantDetails(id);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantDetailPage restaurant={restaurant} />;
}
