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
})