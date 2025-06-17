import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

async function fetchWithAuth(
  url: string,
  accessToken: string | null,
  method: 'GET' | 'POST',
  body?: any,
) {
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
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

export default async function usePostData(
  params: string,
  bodyData: any,
  service:
    | 'digiGold'
    | 'giftCard'
    | 'service'
    | 'payment'
    | 'bbps'
    | 'flight'
    | 'hotel' | 'card' = 'digiGold',
) {
  let url;

  if (service === 'giftCard') {
    url = 'https://dev.wallex.world/qwikcilver/';
  } else if (service === 'digiGold') {
    url = 'https://dev.wallex.world/digi-gold/';
  } else if (service === 'service') {
    url = 'https://dev.wallex.world/service/';
  } else if (service === 'payment') {
    url = 'https://dev.wallex.world/banking/';
  }
  else if (service === 'hotel') {
    url = 'https://dev.wallex.world/hotel/';
  }
  else if (service === 'bbps') {
    url = 'https://dev.wallex.world/bbps/';
  }
  else if (service === 'flight') {
    url = 'https://dev.wallex.world/flight/';
  }
  else if (service === 'card') {
    url = 'https://dev.wallex.world/cards/';
  }


  try {
    // Get the access token from AsyncStorage
    let result: any = await AsyncStorage.getItem('user');
    let response = await fetchWithAuth(
      `${url}${params}`,
      JSON.parse(result)?.accessToken,
      'POST',
      bodyData,
    );
    // console.log(result, 'ppppppppppppp //////// ================ -----------')


    // If unauthorized, try refreshing the token
    // if (response.status === 401) {
    //   accessToken = await refreshAccessToken();
    //   response = await fetchWithAuth(
    //     `${url}${params}`,
    //     accessToken,
    //     'POST',
    //     bodyData,
    //   );
    // }

    // if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();

    console.log(data, 'pppppppppppppp ssssssssssssssssssssssssssss')

    //  console.log(data, 'pppppp  ******************************* pppppppp')

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
