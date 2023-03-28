import React from "react";

const myObject = {
  "elements": [
    {
      "id": "6R0VAWAKC9AX4",
      "name": "Sweets",
      "sortOrder": 4
    },
    {
      "id": "FHNQC3HXMBC8C",
      "name": "Drinks",
      "sortOrder": 3
    },
    {
      "id": "92GFNRCA1NKVY",
      "name": "Fries",
      "sortOrder": 2
    },
    {
      "id": "A69GKYE519BSR",
      "name": "Burgers",
      "sortOrder": 1
    }
  ],
  "href": "http://sandbox.dev.clover.com/v3/merchants/J1X5PEM4A62A1/categories?limit=100"
};

function Test() {
  const names = myObject.elements.map((item) => item.name);

  return (
    <div>
      {names.map((name) => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
}

export default Test;
