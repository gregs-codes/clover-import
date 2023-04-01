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
export function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    return value.toLocaleString(locale, { style: 'currency', currency });
  }