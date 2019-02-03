module.exports = {
    findInList: (item, list) => {
        return list.find(listItem => listItem.name.toLowerCase() === item.toLowerCase());
    }
}