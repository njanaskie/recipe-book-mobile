
export default (ingredients) => {
    return ingredients
    .sort((a, b) => {
        if (a.category === b.category) {
            return b.category - a.category
        }
         return a.category > b.category ? 1 : -1
    })
}