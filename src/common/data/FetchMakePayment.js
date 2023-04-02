import React, { useState } from 'react';

function useMakePayment(chargePrice) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const merchantID = 'J1X5PEM4A62A1';
  const urlClover = `https://scl-sandbox.dev.clover.com/v1/charges`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer a40a964a-76c2-7283-eb15-5273f7448803'
    },
    body: JSON.stringify({
      ecomind: 'moto',
      amount: chargePrice,
      currency: 'usd',
      source: 'test',
      capture: true,
      description: 'test'
    })
  };

  async function makePayment() {
    try {
      const response = await fetch(urlClover, options);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return { data, loading, error, makePayment };
}

function MyComponent() {
  const { data, loading, error, makePayment } = useMakePayment({ chargePrice: 10 });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <button onClick={makePayment}>Make Payment</button>
      {data && <p>Payment successful! Charge ID: {data.id}</p>}
    </div>
  );
}
