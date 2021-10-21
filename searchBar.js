document.addEventListener('DOMContentLoaded', function () {

    const list = document.querySelector("#token_list") // line 23 main.js
    const forms = document.forms;

    // filter tokens
    const searchBar = forms['search-tokens'].querySelector('input'); // line 63 index.html
    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toUpperCase();
        const tokens = list.getElementsByTagName('li');
        const arr = Array.from(tokens)
        arr.forEach((token) => {
            const title = token.lastElementChild.textContent; // token's name</span>
            let tmp;
            if (title === term) {
                tmp = token.nextElementSibling // store sibling after token to insert before if not exact match anymore
                list.insertBefore(token, list.firstElementChild) // exact match listed before arr[0] appears at top of list
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
