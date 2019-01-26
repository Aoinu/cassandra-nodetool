exports.toString = (javaString) => {
    return javaString.toString();
};

exports.toArray = (javaList) => {
    return javaList.toArraySync();
};

exports.toMap = (javaMap) => {
    const convertedObject = {};
    const entrySets = javaMap.entrySetSync().toArraySync();
    for(const entry of entrySets) {
        convertedObject[entry.getKeySync()] = entry.getValueSync();
    }
    return convertedObject;
};
