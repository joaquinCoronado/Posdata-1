import {useEffect, useState} from 'react';
import {Api} from '../api';

interface PlacesState {}

const usePlaces = () => {
  const [places, setPlaces] = useState<PlacesState>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getPlaces = async () => {
    const res = await Api.get('/place/v1/place/search?search=xxxx');
    setIsLoading(false);
  };

  useEffect(() => {
    getPlaces();
  }, [places]);

  return {
    places,
    isLoading,
  };
};

export default usePlaces;
