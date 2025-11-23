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
import { motion } from "framer-motion";
import { useState } from "react";
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
  const [isExiting, setIsExiting] = useState(false);

  const handleBack = () => {
    setIsExiting(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      router.back();
    }, 300);
  };

  // Sort deals by discount (highest first)
  const sortedDeals = [...restaurant.deals].sort((a, b) => {
    const discountA = parseInt(a.discount, 10);
    const discountB = parseInt(b.discount, 10);
    return discountB - discountA;
  });

  const formatTime = (time: string) => {
    // Time is already in 12h format with am/pm suffix (e.g., "4:00pm")
    // Just capitalize the AM/PM part
    if (time.toLowerCase().includes("am")) {
      return time.replace(/am/i, "AM");
    } else if (time.toLowerCase().includes("pm")) {
      return time.replace(/pm/i, "PM");
    }
    // Fallback: if already properly formatted, return as is
    return time;
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ x: "100%" }}
      animate={{ x: isExiting ? "100%" : 0 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      {/* Header with Back Button */}
      <AutoHideHeader>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Back button on mobile, hidden on desktop in favor of centered logo */}
          <button
            onClick={handleBack}
            className="p-2 sm:hidden"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Desktop back button */}
          <button
            onClick={handleBack}
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
                  className="bg-white rounded-lg shadow-sm px-6 py-3"
                >
                  <div className="flex items-center gap-4">
                    {/* Left side: Text content - stacked on mobile, 2 columns on desktop */}
                    <div className="flex-1 flex flex-col sm:grid sm:grid-cols-2 sm:items-center sm:gap-x-6">
                      {/* Discount Badge */}
                      <div className="flex items-center gap-2">
                        <img
                          src="/lightning.png"
                          alt="Lightning"
                          className="w-4 h-6 flex-shrink-0"
                        />
                        <span className="text-2xl font-bold text-primary">
                          {deal.discount}% Off
                        </span>
                      </div>

                      {/* Time and quantity info */}
                      <div className="flex flex-col gap-1">
                        {isDineIn ? (
                          <p className="text-sm text-gray-600">
                            Between {formatTime(deal.open || restaurant.open)} -{" "}
                            {formatTime(deal.close || restaurant.close)}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600">Anytime today</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {qtyLeft} Deals Left
                        </p>
                      </div>
                    </div>

                    {/* Right side: Redeem Button */}
                    <button className="px-6 py-2 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
                      Redeem
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
