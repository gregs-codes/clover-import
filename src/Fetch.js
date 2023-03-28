import { useEffect, useState } from 'react'
function Fetch(fetchtype) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const merchantID = 'J1X5PEM4A62A1',
    urlClover = `https://sandbox.dev.clover.com/v3/merchants/${merchantID}`,
    fetchCategoriesURI = '/categories',
    fetchItemsURI = '/items?expand=categories',
    fetchModifiersURI = '/modifier_groups',
    options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer a40a964a-76c2-7283-eb15-5273f7448803'
    }
  }

    async function getMyData(url, type) {
      setLoading(true)
      try{
          const returnMyData = await fetch(url, options)
          .then(res => res.json())
          .then((result) => {
              setLoading(false)
              console.log(typeof result)
              setData(result)
          })
      } catch(err) {
          setLoading(false);
          setError(error);
      }
  }
useEffect(() => {
  switch (fetchtype) {
    case 'categories':
      getMyData(`${urlClover}${fetchCategoriesURI}`, 'categories')
      break;
    case 'items':
      getMyData(`${urlClover}${fetchItemsURI}`, 'items')
      break;
    case 'modifiers':
      getMyData(`${urlClover}${fetchModifiersURI}`, 'modifiers')
      break;
    default:
      break;
  }
},[])
return { data, loading, error }
}

export default Fetch;
