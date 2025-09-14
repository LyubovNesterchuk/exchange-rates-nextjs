import axios from 'axios';

interface Coordinates {
  latitude: number,
  longitude: number,
}
interface OpenCageCurrency{
  iso_code: string,
  name: string,
  symbol:string,
}
interface OpenCageResult {
  annotations: {currency:OpenCageCurrency}
}
interface OpenCageResponse{
  results: OpenCageResult[],
}

export const getUserInfo = async ({ latitude, longitude }:Coordinates):Promise<OpenCageResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpenCageResponse>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};

// lib/service/opencagedataApi.ts
// import axios from 'axios';

// interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// interface OpenCageCurrency {
//   iso_code: string;
//   name: string;
//   symbol: string;
// }

// interface OpenCageResult {
//   annotations: { currency: OpenCageCurrency };
// }

// interface OpenCageResponse {
//   results: OpenCageResult[];
// }

// export const getUserInfo = async (
//   { latitude, longitude }: Coordinates
// ): Promise<OpenCageResponse> => {
//   const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
//   if (!apiKey) {
//     throw new Error('Missing NEXT_PUBLIC_OPENCAGE_API_KEY');
//   }

//   const url = `https://api.opencagedata.com/geocode/v1/json`;

//   const { data } = await axios.get<OpenCageResponse>(url, {
//     params: {
//       q: `${latitude}+${longitude}`,
//       key: apiKey,
//       language: 'en',
//     },
//   });

//   return data;
// };




// import axios from 'axios';

// interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// export const getUserInfo = async ({ latitude, longitude }: Coordinates) => {
// const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  
  
//   const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(`${latitude},${longitude}`)}`;

//   const { data } = await axios.get(urlPosition, {
//     params: {
//       key: apiKey,
//       language: 'en',
//     },
//   });

//   return data;
// };



