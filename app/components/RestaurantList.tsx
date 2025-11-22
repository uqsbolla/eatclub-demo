"use client";

import { User, Search, SlidersHorizontal, Heart } from "lucide-react";
import type { Restaurant, Deal } from "../types/restaurant";
import { AutoHideHeader } from "./AutoHideHeader";
import { RestaurantImage } from "./RestaurantImage";

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
      <AutoHideHeader>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Mobile layout: User icon - Logo - Sliders icon */}
          {/* Desktop layout: Logo on left - Icons grouped on right */}
          <button className="p-2 sm:hidden">
            <User className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Restaurant Logo" className="w-7 h-7" />
            <span className="hidden sm:inline font-bold italic text-lg text-primary">
              EatClub
            </span>
          </div>
          <div className="flex items-center">
            <button className="p-2 hidden sm:block">
              <User className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2">
              <SlidersHorizontal className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto sm:px-6 lg:px-8 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. chinese, pizza"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-none sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </AutoHideHeader>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {restaurants.map((restaurant) => {
            const bestDeal = getBestDeal(restaurant.deals);
            const isDineIn = bestDeal?.dineIn === "true";

            return (
              <div
                key={restaurant.objectId}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Restaurant Image */}
                <div className="relative w-full h-48 bg-gray-200">
                  <RestaurantImage
                    src={restaurant.imageLink}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  {bestDeal && (
                    <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded">
                      <div className="font-bold text-base leading-tight">
                        {bestDeal.discount}% off{isDineIn ? " - Dine In" : ""}
                      </div>
                      {isDineIn && bestDeal.open && bestDeal.close ? (
                        <div className="text-xs">
                          Arrive before {bestDeal.close}
                        </div>
                      ) : (
                        <div className="text-xs">Anytime today</div>
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
                      <Heart className="w-6 h-6 text-gray-300 hover:text-primary" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {calculateDistance()}, {restaurant.suburb}
                  </p>

                  <p className="text-xs text-gray-600 mb-2">
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
    </div>
  );
}
