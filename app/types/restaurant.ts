export interface Deal {
  objectId: string;
  discount: string;
  dineIn: string;
  lightning: string;
  open?: string;
  close?: string;
  qtyLeft: string;
}

export interface Restaurant {
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

export interface ApiResponse {
  restaurants: Restaurant[];
}

