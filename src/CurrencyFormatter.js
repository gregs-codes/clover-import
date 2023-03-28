 const CurrencyFormatter = (number, options) => {
    const defaultOptions = {
      significantDigits: 2,
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbol: "$",
    };
  
    const currencyFormatter = (value, options) => {
      if (typeof value !== "number") value = 0.0;
      options = { ...defaultOptions, ...options };
      value = value.toFixed(options.significantDigits);
  
      let valueFormatted;

        const [currency, decimal] = value.split(".");
        valueFormatted = `${options.symbol}${currency.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          options.thousandsSeparator
        )}${options.decimalSeparator}${decimal}`;
      
      return valueFormatted;
    };
  
    return currencyFormatter(number, options);
  };

  export default CurrencyFormatter()