const handlerFieldStock = (colors, sizes) => {
    const objStock = [];

    for (const color of colors) {
        for (const size of sizes) {
            const obj = {
                color: {
                    name: color.name,
                    html: color.html
                },
                size: size,
                quantity: 0
            };
            objStock.push(obj);
        }
    }
    return objStock;
}

export default handlerFieldStock