const handlerFilterStock = (filter, stock) => {
    let data = stock;
    if (filter.color.length) data = data.map((data) => filter.color.includes(data?.color.name) ? data : null)
    if (filter.size.length) data = data.map((data) => filter.size.includes(data?.size) ? data : null)
    const index = data.reduce((index, value, pos) => {
        if (value !== null) {
            index.push(pos);
        }
        return index;
    }, []);

    return index

}

export default handlerFilterStock