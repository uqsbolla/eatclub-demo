import { RestaurantList } from "./components/RestaurantList";
import type { Restaurant, ApiResponse } from "./types/restaurant";

async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(
      "https://eccdn.com.au/misc/challengedata.json",
      {
        cache: "no-store", // Disable caching for fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    const data: ApiResponse = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export default async function Home() {
  const restaurants = await getRestaurants();

  return <RestaurantList restaurants={restaurants} />;
}
