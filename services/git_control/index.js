const consts = require('./const_for_class')
const GitController = require('./controller')

// -- строительная фабрика --
async function bilderGitController(id_user) {
    console.log('bild new controller')
    const gc = new GitController(id_user)
    await gc.init()
    return gc;
}


module.exports = {
    bilderGitController,
    ...consts
}