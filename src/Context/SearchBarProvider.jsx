import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const searchBarContext = createContext();

export default function SearchBarProvider({ children }) {
  const [apiData, setApiData] = useState({});
  console.log(apiData);

  const values = useMemo(() => ({
    apiData,
    setApiData,
  }), [setApiData, apiData]);

  return (
    <searchBarContext.Provider value={ values }>
      { children }
    </searchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
