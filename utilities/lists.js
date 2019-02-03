module.exports = {
    find: (item, list) => {
        return list.find(listItem => listItem.name.toLowerCase() === item.toLowerCase());
    },
    remove: (item, list) => {
        return list.filter(listItem => listItem.name !== item);
    }
}