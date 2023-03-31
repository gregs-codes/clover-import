export function groupItemsByCategoryId(items) {
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

export function formatPrice(price) {
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