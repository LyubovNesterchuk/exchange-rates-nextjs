// lib/opencagedataApi.ts

import axios from "axios";

interface OpenCageCurrency {
  iso_code: string;
  name: string;
  symbol: string;
}

interface OpenCageAnnotations {
  currency: OpenCageCurrency;
}

interface OpenCageResult {
  annotations: OpenCageAnnotations;
}

interface OpenCageResponse {
  results: OpenCageResult[];
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getUserCurrency = async ({
  latitude,
  longitude,
}: Coordinates): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OpenCage API key");
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

  const { data } = await axios.get<OpenCageResponse>(url);

  const currency = data?.results?.[0]?.annotations?.currency?.iso_code;

  if (!currency) {
    throw new Error("Currency not found in OpenCage response");
  }

  return currency;
};