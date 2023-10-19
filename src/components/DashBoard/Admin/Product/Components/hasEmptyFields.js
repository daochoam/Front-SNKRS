function hasEmptyFields(obj) {
    if (obj === null || obj === undefined) return true;
    if (typeof obj === 'string' && obj.trim() === '') return true

    if (Array.isArray(obj) && obj.length === 0) return true;
    if (typeof obj === 'object') {
        for (const key in obj) {
            if (hasEmptyFields(obj[key])) return true;
            if (obj[key] !== null && obj[key] !== undefined) return false;
        }
        return true;
    }

    return false;
}
export default hasEmptyFields