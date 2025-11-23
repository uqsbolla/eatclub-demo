import { HomePage } from "@/app/_components/HomePage";
import { getRestaurants } from "@/lib/restaurantData";
import type { Restaurant } from "@/types/restaurant";

async function fetchInitialRestaurants(): Promise<Restaurant[]> {
  try {
    // Directly use shared data fetching logic (no API route needed)
    return await getRestaurants();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export default async function Home() {
  const restaurants = await fetchInitialRestaurants();

  return <HomePage restaurants={restaurants} />;
}
