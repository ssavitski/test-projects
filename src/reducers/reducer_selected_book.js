export default (state, action) => {
    switch(action.type) {
        case 'SELECTED_BOOK':
            return action.payload;
    }

    return state || null;
};