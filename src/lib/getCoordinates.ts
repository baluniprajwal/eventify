import axios from "axios";

interface CoordinatesResult {
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}

export async function getCoordinates(address: string): Promise<CoordinatesResult> {
  if (!address) throw new Error("Address is required");

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  if (!apiKey) throw new Error("Missing OpenCage API key (VITE_OPENCAGE_API_KEY)");

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}&limit=1`;

    const { data } = await axios.get(url);

    if (data?.results?.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      const formattedAddress = data.results[0].formatted;
      return { latitude: lat, longitude: lng, formattedAddress };
    }

    throw new Error("No results found for the given address");
  } catch (error: any) {
    console.error("OpenCage API Error:", error?.response?.data || error.message);
    throw new Error(
      error?.response?.data?.error?.message ||
        error.message ||
        "Unable to fetch coordinates"
    );
  }
}
