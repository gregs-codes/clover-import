import React, { useState } from 'react';
import Fetch from './Fetch'

function groupItemsByCategoryId(items) {
  return items.reduce((acc, item) => {
  const categoryId = item.categories.elements[0].id;
  if (!acc[categoryId]) {
      acc[categoryId] = [];
  }
  acc[categoryId].push(item);
  return acc;
  }, {});
}

function ListItems(category_id) {
  const [categoryObj, setCategory] = useState();
  const { data, loading, error } = Fetch("items");

  let myArray = {};

  if (loading === false && data != null) {
    const itemsByCategoryId = groupItemsByCategoryId(data.elements);

    return (
      <div>
        {Object.entries(itemsByCategoryId).map(([categoryId, items]) => (
          <div key={categoryId}>
            {categoryId}
            {items.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (loading) return <h1> LOADING ... </h1>;
  if (error) console.log(error);
}

export default ListItems;