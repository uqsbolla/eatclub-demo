"use client";

import { User, Search, SlidersHorizontal, Heart } from "lucide-react";
import type { Restaurant, Deal } from "../types/restaurant";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  const getBestDeal = (deals: Deal[]) => {
    if (!deals || deals.length === 0) return null;
    return deals.reduce((best, current) =>
      parseInt(current.discount) > parseInt(best.discount) ? current : best
    );
  };

  const calculateDistance = () => {
    // Mock distance for now
    return "0.5km Away";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button className="p-2">
            <User className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-red-500"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              <path d="M20 5C15 5 10 8 10 15C10 20 15 25 20 30C25 25 30 20 30 15C30 8 25 5 20 5Z" />
              <circle cx="20" cy="15" r="5" fill="white" />
            </svg>
          </div>
          <button className="p-2">
            <SlidersHorizontal className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. chinese, pizza"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Restaurant List */}
      <div className="max-w-md mx-auto px-4 pb-6 space-y-4">
        {restaurants.map((restaurant) => {
          const bestDeal = getBestDeal(restaurant.deals);
          const isDineIn = bestDeal?.dineIn === "true";

          return (
            <div
              key={restaurant.objectId}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Restaurant Image */}
              <div className="relative">
                <img
                  src={restaurant.imageLink}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Restaurant";
                  }}
                />
                {bestDeal && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded">
                    <div className="font-bold text-lg leading-tight">
                      {bestDeal.discount}% off
                    </div>
                    <div className="text-xs">
                      {isDineIn ? "Dine In" : "Anytime today"}
                    </div>
                    {isDineIn && bestDeal.open && bestDeal.close && (
                      <div className="text-xs">
                        Arrive before {bestDeal.close}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {restaurant.name}
                  </h3>
                  <button className="p-1">
                    <Heart className="w-6 h-6 text-gray-300 hover:text-red-500" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {calculateDistance()}, {restaurant.suburb}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.cuisines.join(", ")}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Dine In</span>
                  <span>•</span>
                  <span>Takeaway</span>
                  <span>•</span>
                  <span>Order Online</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
