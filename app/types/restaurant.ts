export interface Deal {
  objectId: string;
  discount: string;
  dineIn: string;
  open?: string;
  close?: string;
  qtyLeft: string;
}

// Raw restaurant data from external API
export interface RawRestaurant {
  objectId: string;
  name: string;
  address1: string;
  suburb: string;
  cuisines: string[];
  imageLink: string;
  open: string;
  close: string;
  deals: Deal[];
}

// Optimized restaurant data returned to client
export interface Restaurant {
  objectId: string;
  name: string;
  suburb: string;
  cuisines: string[];
  imageLink: string;
  bestDeal: Deal | null;
  distance: string;
}

export interface ApiResponse {
  restaurants: RawRestaurant[];
}

