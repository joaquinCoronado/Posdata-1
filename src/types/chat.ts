export interface ExchangeUser {
  id: number;
  releaseDate: string;
  senderId: number;
  senderUser: ErUser;
  receiverId: number;
  receiverUser: ErUser;
  sender: Sender;
  requestStatus: string;
  createdAt: string;
}

export interface ErUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  country: string;
  city: string;
  gender: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sender {
  id: number;
  placeId: string;
  place: Place;
  textNote: string;
  itemStatus: string;
  ownerId: number;
}

export interface Place {
  id: string;
  picture: string;
  name: string;
  country: string;
  state: string;
  city: string;
  ownerId: number;
  createdAt: string;
}
