export default function reducers(state = [], action) {
    switch(action.type) {
        case 'OPEN':
            return state;
        // return [...state, Object.assign({}, action.course)] //deep copy
            // create a new array with new value assigned
        default:
            return state;
    }
}
