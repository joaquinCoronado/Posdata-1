import React, {createContext, useState, useContext} from 'react';
import propTypes from 'prop-types';
import {listAllExchagnes} from '../api';

//The prop types in the context
type ExchangeContextProps = {
  exchanges: any;
  setExchanges: any;
  selectedExchange: any;
  setSelectedExchange: any;
  loadExchanges: any;
  isExchangesLoading: boolean;
};

//Create the context with PropTypes
const ExchangeContext = createContext<ExchangeContextProps>(
  {} as ExchangeContextProps,
);

//Create the Provider with the values to read
//and update the context fields
const ExchangeProvider = ({children}: any) => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [isExchangesLoading, setExchangesLoading] = useState(false);
  const [exchanges, setExchanges] = useState({
    exchangesPenddingToAccept: [],
    exchangesActives: [],
    exchangesCompleted: [],
  });

  const loadExchanges = async () => {
    setExchangesLoading(true);
    try {
      const responses = await listAllExchagnes();
      setExchanges((prev: any) => ({
        ...prev,
        exchangesPenddingToAccept: responses[0],
        exchangesActives: responses[1],
        exchangesCompleted: responses[2],
      }));
    } catch (e) {
      console.log(e);
    }
    setExchangesLoading(false);
  };

  return (
    <ExchangeContext.Provider
      value={{
        exchanges,
        setExchanges,
        selectedExchange,
        setSelectedExchange,
        loadExchanges,
        isExchangesLoading,
      }}>
      {children}
    </ExchangeContext.Provider>
  );
};

ExchangeProvider.propTypes = {
  children: propTypes.element,
};

//Create a hook to get the context
const useExchangeContext = () => {
  const context = useContext(ExchangeContext);
  if (context === undefined) {
    throw new Error('Auth context must be used within Auth Provider');
  }
  return context;
};

export {ExchangeProvider, useExchangeContext};
