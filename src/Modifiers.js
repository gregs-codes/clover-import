import React,{ useState } from 'react';
import Fetch from './Fetch';
import './Modifier.scss';


function Modifiers(props) {
    const { modifierGroupId } = props;
    const { data, loading, error } = Fetch("modifiers", modifierGroupId);

    function formatPrice(price) {
        let formattedPrice;
  
        if (price.toString().length === 3) {
          formattedPrice = (price / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        } else if (price.toString().length === 4) {
          formattedPrice = (price / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        } else if (price.toString().length === 5) {
          formattedPrice = (price / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        } else {
          formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
  
        return formattedPrice;
      }
    //console.log('modifierGroupId', data)
    if (loading === false && data != null) {
        const modifierItems = data.elements;
        const items = data.elements;
        //console.log('modifierItems', modifierItems)
      return (
        <div className="modifier-view">
        {data ? (
        modifierItems.map(modifier => (
            <div key={modifier.id}>
                <input type="checkbox" id={modifier.id} name={modifier.name} value={modifier.price} />
                <label htmlFor={modifier.id}>{modifier.name} {modifier.price}</label>
            </div>
        ))
        ) : (
            <div>
                <h2>No Modifiers</h2>
            </div>
        )}
        </div>
      );
            
    }
    if (loading) return (
        <h3>Loading Modifiers </h3>
        );
    if (error) console.log(error);
}
export default Modifiers;