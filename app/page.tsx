import { RestaurantList } from "./components/RestaurantList";
import type { Restaurant } from "./types/restaurant";

async function getRestaurants(): Promise<Restaurant[]> {
  try {
    // Use the same API endpoint to ensure consistent sorting
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/restaurants`,
      {
        cache: "no-store", // Disable caching for fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    const restaurants: Restaurant[] = await response.json();
    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export default async function Home() {
  const restaurants = await getRestaurants();

  return <RestaurantList restaurants={restaurants} />;
}
