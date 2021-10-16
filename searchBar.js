document.addEventListener('DOMContentLoaded', function () {

    const list = document.querySelector("#token_list")
    const forms = document.forms;

    // filter books
    const searchBar = forms['search-tokens'].querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toUpperCase();
        const tokens = list.getElementsByTagName('li');
        const arr = Array.from(tokens)
        arr.forEach((token) => {
            const title = token.lastElementChild.textContent;
            let tmp;
            if (title === term) {
                tmp = token.nextElementSibling
                list.insertBefore(token, list.firstElementChild)
            } else if (title.toUpperCase().indexOf(term) != -1) {
                list.insertBefore(token, tmp)
                token.style.display = "";
            }
            else {
                token.style.display = 'none';
            }
        });
    });
})
