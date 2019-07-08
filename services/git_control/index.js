const consts = require('./const_for_class')

// -- строительная фабрика --
async function bilderGitController(id_user) {
    const gc = new GitController(id_user)
    await gc.init()
    return gc;
}


module.exports = {
    bilderGitController,
    ...consts
}