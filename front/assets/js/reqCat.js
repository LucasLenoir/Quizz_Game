const reqCategories = (path) => {
    const myInit = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },

    }
    fetch(path, myInit)
        .then(res => {
            // return res.json();
            console.log(res);
        })
    // .then(response => {
    //     console.log(response);
    // })
}
export { reqCategories };