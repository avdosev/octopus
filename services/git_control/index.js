const consts = require('./const_for_class')
const GitController = require('./controller')

// -- строительная фабрика --
async function bilderGitController(user) {
    const gc = new GitController(user.id)
    await gc.init(user.current_account)
    return gc;
}


module.exports = {
    bilderGitController,
    ...consts
}