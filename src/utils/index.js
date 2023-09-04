/**
 * 去除对象空值
 * @param {*} obj
 * @returns
 */
export function removeEmptyIncludeZero(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && obj[key] !== 0) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

export function arr1to2(arr, number) {
    const arr2 = [];
    let len = arr.length;
    for (let i = 0, j = 0; i < len; i += number, j++) {
        arr2[j] = arr.splice(0, number);
    }
    return arr2;
}
