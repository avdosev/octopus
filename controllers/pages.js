// Для генерации однообразных функций
const titleForPages = ['Войти','Регистраци','Ошибка','Не найдено']
const objWithPagesMiddleware = ['signin', 'register', 'error_page', 'not_found'].reduce((acc, cur, index) => {
    acc[cur] = (req, res) => { res.render(cur, {
        authorised: req.isAuthenticated(),
        title: titleForPages[index]
    }) } // future middleware
    return acc
}, {})

const profile =  async (req, res) => {
    res.render('profile', {
        authorised: req.isAuthenticated()
    })
}

const main = async (req, res) => {
    const gitController = req.user.gitControll
    const controller = gitController.getCurrentControll();

    const repositories = (controller &&  await controller.getListRepos()) || []
    const profile = (controller && await controller.getProfile()) || null
    const accounts = gitController.accounts || {}
    
    res.render('main', {
        authorised: req.isAuthenticated(),
        repositories,
        accounts,
        username: controller ? controller.user.username : '',
        title: 'Octobucket',
        profile
    })
};

const repo = async (req, res) => {

    const gitController = req.user.gitControll
    const controller = gitController.getCurrentControll();
    
    const { 
        repo: repo_indet,
        user: user_indet }  = req.params;
    
    try {
        const repo = await controller.getRepo(repo_indet, user_indet);
        res.render('repo', {
            authorised: req.isAuthenticated(),
            repo,
            title: `${user_indet}/${repo_indet}`
        })
    } catch (err) {
        console.log('при получении репозитория возникла ошибка: ', err)
        console.log('Данные при получении репозитория: ', repo_indet, user_indet)
        const render_not_found = objWithPagesMiddleware.not_found
        render_not_found(req, res);
    }

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

const createRepo = async (req, res) => {

    const gitController = req.user.gitControll
    const controller = gitController.getCurrentControll();

    const accounts = gitController.accounts || {}
    
    res.render('create_repo', {
        authorised: req.isAuthenticated(),
        title: 'Создание репозитория', 
        username: controller ? controller.user.username : '',
        accounts
    })
}


module.exports = {
    ...objWithPagesMiddleware,
    main,
    profile,
    repo,
    treeOfRepo,
    commitsOfRepo,
    createRepo
}
