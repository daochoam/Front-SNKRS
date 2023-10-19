const handlerStockGteZero = (stock) => {
    console.log("🚀 ~ file: handlerStockGteZero.js:2 ~ handlerStockGteZero ~ stock:", stock)
    const stockGteZero = stock.filter((item) => item.quantity > 0);
    return stockGteZero
}

export default handlerStockGteZero;