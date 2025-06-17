import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

async function fetchWithAuth(url: string, accessToken: string | null) {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function refreshAccessToken() {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) throw new Error('No refresh token available');

  // Perform token refresh (URL and process will depend on your backend)
  const response = await fetch(
    'https://dev.wallex.world/service/auth/refresh-token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!response.ok) throw new Error('Failed to refresh token');

  const { accessToken: newAccessToken } = await response.json();
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
  return newAccessToken;
}

export default async function useGetData(
  params: string,
  service: 'digiGold' | 'giftCard' | 'service' | 'flight' | 'hotel' | 'card' = 'digiGold',
) {
  let url;

  if (service === 'giftCard') {
    url = 'https://dev.wallex.world/qwikcilver/';
  } else if (service === 'digiGold') {
    url = 'https://dev.wallex.world/digi-gold/';
  } else if (service === 'service') {
    url = 'https://dev.wallex.world/service/';
  }
  else if (service === 'hotel') {
    url = 'https://dev.wallex.world/hotel/';
  }
  else if (service === 'flight') {
    url = 'https://dev.wallex.world/flight/';
  }
  else if (service === 'card') {
    url = 'https://dev.wallex.world/cards/';
  }

  try {
    // Get the access token from AsyncStorage
    let accessToken = await AsyncStorage.getItem('access_token');
    let result: any = await AsyncStorage.getItem('user');
    let response = await fetchWithAuth(`${url}${params}`, JSON.parse(result)?.accessToken);

    // If unauthorized, try refreshing the token
    if (response.status === 401) {
      accessToken = await refreshAccessToken();
      response = await fetchWithAuth(`${url}${params}`, JSON.parse(result)?.accessToken);
    }

    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
