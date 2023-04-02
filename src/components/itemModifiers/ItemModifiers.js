import React,{ useState } from 'react';
import Fetch from '../../common/data/FetchModifiers';
import './Modifier.scss';


function Modifiers(props) {
    const { item, modifierGroupId, modifier, formatCurrency, setModifiers } = props;
    const { data, loading, error } = Fetch("modifiers", modifierGroupId);
    
    //console.log(modifier)
    function handleCheckboxChange(event) {
      const modifierId = event.target.id;
      const modifierName = event.target.name;
      const modifierPrice = event.target.value;
      const isChecked = event.target.checked;

      setModifiers(prevModifiers => {
          if (isChecked) {
              return { ...prevModifiers, [modifierId]: { name: modifierName, price: modifierPrice } };
          } else {
              const { [modifierId]: omit, ...restModifiers } = prevModifiers;
              return restModifiers;
          }
      });
  }

    if (loading === false && data != null) {
        const modifierItems = data.elements;
        console.log('modifierItems', modifierItems)
        const items = data.elements;
        //console.log('modifierItems', modifierItems)
      return (
        <div id={item.id} className="modifier-view">
        {data ? (
        modifierItems.map(modifier => (
            <div key={`${item.id}-${modifier.id}`}>
                <input type="checkbox" id={`${item.id}-${modifier.id}`} name={modifier.name} value={modifier.price} onChange={(e)=>handleCheckboxChange(e)} />
                <label htmlFor={`${item.id}-${modifier.id}`}>{modifier.name} {formatCurrency(modifier.price/100)}</label>
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