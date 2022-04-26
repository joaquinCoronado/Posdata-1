import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Api = axios.create({
  //baseURL: 'http://posdata.io',
  baseURL: 'http://localhost',
});

const authConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: 'frontendapp',
    password: '123456',
  },
};

//IMAGES
const uploadImage = async (photo: any) => {
  const formData = new FormData();
  formData.append('file', {
    name: photo.name,
    type: photo.type,
    uri: photo.uri,
  });

  let token = await AsyncStorage.getItem('token');

  const res = await Api.post('/storage/v1/image', formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });
  return res;
};

const deleteImage = async (imageURL: string) => {
  let token = await AsyncStorage.getItem('token');

  const res = await Api.delete('/storage/v1/image?imagePath=' + imageURL, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res;
};

//PLACES
const createNewPlace = async (place: any) => {
  let token = await AsyncStorage.getItem('token');
  const response = await Api.post('/place/v1/place', place, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response;
};

const getPlacesByOwnerId = async (userId: number) => {
  let token = await AsyncStorage.getItem('token');
  let url = '/place/v1/place/list?ownerId=' + userId;
  const response = await Api.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

const searchPlaces = async (search: string) => {
  let token = await AsyncStorage.getItem('token');
  let url = '/place/v1/place/search?search=' + search;
  const response = await Api.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

//USERS
const getUserInfo = async (userId: number) => {
  let token = await AsyncStorage.getItem('token');
  let url = 'user/v1/user/query/' + userId;
  const response = await Api.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

const updateInfoUser = async (user: any) => {
  let token = await AsyncStorage.getItem('token');
  let url = '/user/v1/user';
  console.log('body', user);
  const response = await Api.patch(url, user, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

//EXCHANGEST
interface Exchange {
  senderId: number | undefined;
  receiverId: number;
  textNote: string;
  requestedPlaceId: string;
  releaseDate: Date;
}

const createNewExchange = async (exchange: Exchange) => {
  let token = await AsyncStorage.getItem('token');
  const body = {...exchange, releaseDate: exchange.releaseDate.toISOString()};
  let url = '/exchange/v1/exchange';
  console.log('body', body);
  const response = await Api.post(url, body, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

const getPenddingToAcceptExchanges = async () => {
  let token = await AsyncStorage.getItem('token');
  let url = '/exchange/v1/exchange/pending';
  const response = await Api.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

const getActiveExchanges = async () => {
  let token = await AsyncStorage.getItem('token');
  let url = '/exchange/v1/exchange';
  const response = await Api.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

interface AcceptedExchangeBody {
  placeId: string;
  textNote: string;
  ownerId: number;
}

const handleExchangeRequest = async (
  isAccept: boolean,
  exchangeId: number,
  body: AcceptedExchangeBody,
) => {
  let token = await AsyncStorage.getItem('token');
  let url = `/exchange/v1/exchange/handler?isAccepted=${isAccept}&exchangeId=${exchangeId}`;
  const response = await Api.post(url, body, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

const addNoteToRequest = async (itemId: number, urlImage: string) => {
  let token = await AsyncStorage.getItem('token');
  let url = `/exchange/v1/items?itemId=${itemId}&urlImage=${urlImage}`;
  const response = await Api.put(
    url,
    {},
    {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  return response.data;
};

const acceptNote = async (itemId: number, exchangeId: number) => {
  let token = await AsyncStorage.getItem('token');
  let url = `/exchange/v1/items/accepter?itemId=${itemId}&exchangeId=${exchangeId}`;
  const response = await Api.put(
    url,
    {},
    {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  return response.data;
};

export {
  Api,
  authConfig,
  uploadImage,
  createNewPlace,
  searchPlaces,
  getUserInfo,
  getPlacesByOwnerId,
  updateInfoUser,
  deleteImage,
  createNewExchange,
  getPenddingToAcceptExchanges,
  getActiveExchanges,
  handleExchangeRequest,
  addNoteToRequest,
  acceptNote,
};
