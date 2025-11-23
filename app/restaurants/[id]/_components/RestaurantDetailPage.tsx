"use client";

import {
  User,
  SlidersHorizontal,
  ArrowLeft,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { RawRestaurant, Deal } from "@/types/restaurant";
import { AutoHideHeader } from "@/components/AutoHideHeader";
import { RestaurantImage } from "@/components/RestaurantImage";

interface RestaurantDetailPageProps {
  restaurant: RawRestaurant;
}

export function RestaurantDetailPage({
  restaurant,
}: RestaurantDetailPageProps) {
  const router = useRouter();

  // Sort deals by discount (highest first)
  const sortedDeals = [...restaurant.deals].sort((a, b) => {
    const discountA = parseInt(a.discount, 10);
    const discountB = parseInt(b.discount, 10);
    return discountB - discountA;
  });

  const formatTime = (time: string) => {
    // Convert 24h format to 12h format with AM/PM
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes}${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <AutoHideHeader>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Back button on mobile, hidden on desktop in favor of centered logo */}
          <button
            onClick={() => router.back()}
            className="p-2 sm:hidden"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Desktop back button */}
          <button
            onClick={() => router.back()}
            className="p-2 hidden sm:block"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Restaurant Logo" className="w-7 h-7" />
            <span className="hidden sm:inline font-bold italic text-lg text-primary">
              EatClub
            </span>
          </div>

          {/* Icons */}
          <div className="flex items-center">
            <button className="p-2 hidden sm:block">
              <User className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2">
              <SlidersHorizontal className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </AutoHideHeader>

      {/* Main Content */}
      <div className="pt-16">
        {/* Restaurant Image with Carousel Indicators */}
        <div className="relative w-full h-64 sm:h-80 bg-gray-200">
          <RestaurantImage
            src={restaurant.imageLink}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          {/* New Badge */}
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-md text-sm font-semibold">
            New
          </div>
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-around">
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-600">Menu</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-600">Call us</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Location</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600">Favourite</span>
            </button>
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Restaurant Name and Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {restaurant.name}
            </h1>
            <p className="text-sm text-gray-600 mb-3">
              {restaurant.cuisines.join(" • ")} • $
            </p>

            {/* Hours */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>
                Hours: {formatTime(restaurant.open)} -{" "}
                {formatTime(restaurant.close)}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>
                {restaurant.address1} {restaurant.suburb} • 1.0km Away
              </span>
            </div>
          </div>

          {/* Deals Section */}
          <div className="space-y-4">
            {sortedDeals.map((deal) => {
              const isDineIn = deal.dineIn === "true";
              const qtyLeft = parseInt(deal.qtyLeft, 10);

              return (
                <div
                  key={deal.objectId}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Discount Badge */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-6 h-6 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        <span className="text-2xl font-bold text-primary">
                          {deal.discount}% Off
                        </span>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          {isDineIn ? (
                            <p className="text-sm text-gray-600">
                              Between {formatTime(deal.open || restaurant.open)}{" "}
                              - {formatTime(deal.close || restaurant.close)}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-600">
                              Anytime today
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {qtyLeft} Deals Left
                          </p>
                        </div>
                        <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-red-600 transition-colors">
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
