import React,{ useState } from 'react';
import Fetch from './Fetch';
import ListItems from './ListItems'

function groupItemsByCategoryId(items) {
    return items.reduce((acc, item) => {
    const categoryId = item.categories.elements[0].id;
    const categoryName = item.categories.elements[0].name;

    if (!acc[categoryId, categoryName]) {
        acc[categoryId, categoryName] = [];
    }

    acc[categoryId, categoryName].push(item);
    
    return acc;
    }, {});
}

function ListCategories() {
   // const [categoryObj, setCategory] = useState();
    const { data, loading, error } = Fetch("items");
  
   // let myArray = {};
  
    if (loading === false && data != null) {
      const itemsByCategoryId = groupItemsByCategoryId(data.elements);
      console.log(itemsByCategoryId)
      return (
        <div>
          {Object.entries(itemsByCategoryId).map(([categoryId, items]) => (
            <div key={categoryId}>
             <ul>Category Name: {categoryId}

              {items.map((item) => (
                <li key={item.id}>
                  {/* <img width={'100px'} src={`https://dev.cloverstatic.com/menu-assets/items/${item.id}.jpeg`} />*/}
                  {item.name} - {item.price} 
                </li>
              ))}
              </ul> 
            </div>
          ))}
        </div>
      );
    }
    if (loading) return <h1> LOADING ... </h1>;
    if (error) console.log(error);
  }
export default ListCategories;