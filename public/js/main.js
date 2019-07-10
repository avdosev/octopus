document.addEventListener('DOMContentLoaded', () => {
    const accs = document.querySelectorAll('.account')
    accs.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const acc_id = elem.attributes.data.value;
            fetch('/api/swap_account', {
                method: 'post',
                body: `{"new_id": ${acc_id}}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                window.location.reload();
            })
        })
    })


    const removeBtns = document.querySelectorAll('.removeBtn')
    removeBtns.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const elem = e.target;
            const parentNode = elem.parentElement;
            fetch('/api/remove_repo', {
                method: 'delete',
                body: JSON.stringify({
                    repo_indent: elem.parentElement.attributes['repo-indent'].value,
                    account_indent: elem.parentElement.attributes['account-indent'].value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                if (parentNode.parentElement.children.length == 3)
                    parentNode.insertAdjacentHTML('afterend', '<p>тут ничего нет</p>')
                parentNode.remove()
            })
        })
    })
})