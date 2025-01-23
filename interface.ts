import { UserGeneric } from "@llampukaq/realm";

export type User =
  | UserGeneric<{
      address: Address[];
      document?: string;
      phone?: string;
    }>
  | undefined;
export type Address = {
  who: string;
  addressId: string;
  name: string;
  phone: string;
  map: any;
  reference: string;
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  postcode: string;
  suburb: string;
  street: string;
  state_code: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  plus_code: string;
  isMatriz: boolean;
  rank: {
    importance: number;
    popularity: number;
  };
  place_id: string;
};

export type order = {
  organizationId: string;
  shop: { productId: string; count: number }[];
  show: boolean;
  created: Date | string;
  status: "0" | "50" | "100";
  to: {
    userId: string;
    addressId: any;
  };
  orderId: string;
  payment: "transfer" | "cash" | "paypal";
  estimateId: string;
  discard?: boolean;
  distance: number;
  deliveryOfferId: string;
  deliveryPrice?: number;
  shareLocationUrl?: string;
  shippingId?: string;
  onlineSupportUrl?: string;
  price?: number;
};

export interface estimateShipingOrderReturn {
  estimateId: string;
  referenceId: string;
  isTest: boolean;
  items: {
    type: "FRAGILE" | "STANDARD" | "COLD";
    value: number;
    description: string;
    sku: string;
    quantity: number;
    volume: number;
    weight: number;
  }[];
  waypoints: {
    type: "PICK_UP" | "DROP_OFF";
    addressStreet: string;
    addressAdditional: string;
    city: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    name: string;
    instructions: string;
  }[];
  route: {
    distance: number;
  };
  deliveryOffers: {
    deliveryOfferId: string;
    deliveryMode: string;
    confirmationTimeLimit: string;
    pricing: {
      subTotal: number;
      taxes: number;
      total: number;
      currency: string;
    };
  }[];
  notificationMail: string;
}

export interface estimateShipingOrderBody {
  referenceId: string;
  deliveryTime?: Date;
  isTest?: boolean;
  items: {
    type: "FRAGILE" | "STANDARD" | "COLD";
    value: number;
    description: string;
    sku?: string;
    quantity: number;
    volume: number;
    weight: number;
  }[];
  waypoints: {
    type: "PICK_UP" | "DROP_OFF";
    addressStreet: string;
    addressAdditional?: string;
    city: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    name?: string;
    instructions?: string;
    collectMoney?: number;
  }[];

  notificationMail?: string;
  requirements?: {
    includeDeliveryFee?: boolean;
  };
}

export interface LocationData {
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  hamlet: string;
  postcode: string;
  district: string;
  neighbourhood: string;
  suburb: string;
  street: string;
  datasource: {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  };
  state_code: string;
  lon: number;
  lat: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  timezone: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
  };
  plus_code: string;
  plus_code_short: string;
  rank: {
    confidence: number;
    confidence_street_level: number;
    match_type: string;
  };
  place_id: string;
  bbox: {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
  };
}
