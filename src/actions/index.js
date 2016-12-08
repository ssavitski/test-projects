function selectBook(book) {
    return {
        type: 'SELECTED_BOOK',
        payload: book,
    };
}

export default selectBook;