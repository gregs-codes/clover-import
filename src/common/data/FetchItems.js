import { useEffect, useState } from 'react'
function Fetch(fetchtype, seekingId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const merchantID = 'J1X5PEM4A62A1',
    urlClover = `https://sandbox.dev.clover.com/v3/merchants/${merchantID}`,
    fetchCategoriesURI = '/categories',
    fetchItemsURI = '/items?expand=modifierGroups%2Ccategories',
    fetchModifiersURI = `/modifier_groups/${seekingId}/modifiers`,
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
          await fetch(url, options)
          .then(res => res.json())
          .then((result) => {
              setLoading(false)
              //console.log(typeof result)
              setData(result)
              console.log(result)
          })
      } catch(err) {
          const fakeDataResponse = await fetch('fakeInventory.json')
          const fakeData = await fakeDataResponse.json()
          setData(fakeData)
          setLoading(false);
          setError(error);
      }
  }

useEffect(() => {
  getMyData(`${urlClover}${fetchItemsURI}`, 'items')
},[])
return { data, loading, error }
}

export default Fetch;
