import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Api = axios.create({
  baseURL: 'http://posdata.io',
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
};
