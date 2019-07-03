const Github = require('./github')
const Bitbucket = require('./bitbucket')

const consts = require('./const_for_class')


class GitController {
    // Это не то
    // constructor({token, username, password}, git_service) {
    //     this.gitData({token, username, password}, git_service)
    // }
    
    // set gitData({token, username, password}, git_service) {
    //     this.token = token;
    //     this.git_service = git_service;
    //     this.userdata = {
    //         username,
    //         password
    //     }
    // }

    // get service() {
    //     return this.git_service;
    // }

    // set service(service) {
    //     // todo хз че тут должно быть возможно какой то свап или еще чета
    //     this.git_service = service
    // }
    
}

module.exports = {
    GitController,
    ...consts
}