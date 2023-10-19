const getIdByName = (data, key, field) => {
    for (const obj of data) {
        if (obj[key] === field) {
            return obj._id;
        }
    }
    return null;
}

export default getIdByName