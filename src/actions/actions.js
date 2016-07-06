export function openAction(id) {
    console.log("actions.openAction");
    return { type: 'OPEN', id }; // in ES6 omit id: id
}

export function markAction(id) {
    console.log("actions.markAction");
    return { type: 'MARK', id }; // in ES6 omit id: id
}


