// import PropTypes from 'prop-types';
// import { createContext, useEffect, useMemo, useState } from 'react';
// // import useFetch from '../hooks/useFetch';
// import { fetchMealApi } from '../services/fetchMealApi';

// const searchBarContext = createContext();

// export default function SearchBarProvider({ children }) {
//   const [searchData, setsearchData] = useState({});

//   useEffect(() => {

//   });

//   const fetchRecipesApi = useCallBack(async () => {
//     const apiData = await
//   });

//   const values = useMemo(() => ({
//     searchData,
//     fetchRecipesApi,
//   }), [searchData, fetchRecipesApi]);

//   return (
//     <searchBarContext.Provider value={ values }>
//       { children }
//     </searchBarContext.Provider>
//   );
// }

// SearchBarProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
