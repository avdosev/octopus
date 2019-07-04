// Для генерации однообразных функций
const objWithPagesMiddleware = ['main', 'signin', 'register', 'error_page'].reduce((acc, cur) => {
    acc[cur] = (req, res) => { res.render(cur) } // middleware
    return acc
}, {})

const profile =  async (req, res) => {
    res.render('profile', )
}

module.exports = {
    ...objWithPagesMiddleware
}
