import type {
  RawRestaurant,
  Restaurant,
  ApiResponse,
  Deal,
} from "@/types/restaurant";

/**
 * Fetches restaurant data from the external API
 */
export async function fetchRestaurantsFromAPI(): Promise<RawRestaurant[]> {
  const response = await fetch(
    "https://eccdn.com.au/misc/challengedata.json",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants from external API");
  }

  const data: ApiResponse = await response.json();
  return data.restaurants;
}

/**
 * Gets the best deal (highest discount) for a restaurant
 */
export function getBestDeal(deals: Deal[]): Deal | null {
  if (!deals || deals.length === 0) return null;
  return deals.reduce((best, current) =>
    parseInt(current.discount) > parseInt(best.discount) ? current : best
  );
}

/**
 * Gets the highest discount value from a restaurant's deals
 */
export function getBestDiscount(restaurant: RawRestaurant): number {
  if (!restaurant.deals || restaurant.deals.length === 0) return 0;
  return Math.max(...restaurant.deals.map((deal) => parseInt(deal.discount)));
}

/**
 * Filters restaurants by search term (name or cuisine)
 */
export function filterRestaurants(
  restaurants: RawRestaurant[],
  searchTerm: string
): RawRestaurant[] {
  if (!searchTerm) return restaurants;

  const lowerSearchTerm = searchTerm.toLowerCase();

  return restaurants.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(lowerSearchTerm);
    const cuisineMatch = restaurant.cuisines.some((cuisine) =>
      cuisine.toLowerCase().includes(lowerSearchTerm)
    );
    return nameMatch || cuisineMatch;
  });
}

/**
 * Sorts restaurants by best deal (highest discount first)
 */
export function sortRestaurantsByDeal(
  restaurants: RawRestaurant[]
): RawRestaurant[] {
  return [...restaurants].sort((a, b) => {
    return getBestDiscount(b) - getBestDiscount(a);
  });
}

/**
 * Transforms raw restaurant data to optimized restaurant list format
 * (includes only the best deal per restaurant)
 */
export function transformToRestaurantList(
  restaurants: RawRestaurant[]
): Restaurant[] {
  return restaurants.map((restaurant) => {
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
      distance: "0.5km Away", // TODO: Calculate actual distance
    };
  });
}

/**
 * Main function to get filtered, sorted, and transformed restaurant list
 */
export async function getRestaurants(
  searchTerm?: string
): Promise<Restaurant[]> {
  // Fetch raw data
  const rawRestaurants = await fetchRestaurantsFromAPI();

  // Filter by search term if provided
  const filteredRestaurants = filterRestaurants(rawRestaurants, searchTerm || "");

  // Sort by best deal
  const sortedRestaurants = sortRestaurantsByDeal(filteredRestaurants);

  // Transform to optimized format
  return transformToRestaurantList(sortedRestaurants);
}

/**
 * Gets a single restaurant by ID
 */
export async function getRestaurantById(
  id: string
): Promise<RawRestaurant | null> {
  const rawRestaurants = await fetchRestaurantsFromAPI();
  return rawRestaurants.find((r) => r.objectId === id) || null;
}

