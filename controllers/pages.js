const objWithPagesMiddleware = ['main', 'signin', 'register', 'error_page'].reduce((acc, cur) => {
    acc[cur] = (req, res) => { res.render(cur) } // middleware
    return acc
}, {})

module.exports = {
    ...objWithPagesMiddleware
}
