export default (array) => {
    const obj = {};
    array.map(item => {
        if (item.checked) {
            if (obj[item.group]) {
                obj[item.group].push(item.item);
            } else {
                obj[item.group] = [item.item];
            }
        }
    });
    return { ...obj };
}