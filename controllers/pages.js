// Для генерации однообразных функций
const objWithPagesMiddleware = ['signin', 'register', 'error_page', 'not_found'].reduce((acc, cur) => {
    acc[cur] = (req, res) => { res.render(cur, {
        authorised: req.isAuthenticated()
    }) } // future middleware
    return acc
}, {})

const profile =  async (req, res) => {
    res.render('profile', {
        authorised: req.isAuthenticated()
    })
}

const main = async (req, res) => {
    res.render('main', {
        authorised: req.isAuthenticated()
    })
};

const repo = async (req, res) => {
    res.render('repo', {
        authorised: req.isAuthenticated()
    })
}

const treeOfRepo = async (req, res) => {
    res.render('treeOfRepo', {
        authorised: req.isAuthenticated()
    })
}

const commitsOfRepo = async (req, res) => {
    res.render('commitsOfRepo', {
        authorised: req.isAuthenticated(),
        title: 'Commits'
    })
}


module.exports = {
    ...objWithPagesMiddleware,
    main,
    profile,
    repo,
    treeOfRepo,
    commitsOfRepo,
}
