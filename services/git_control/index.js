const github_api = require('github-api')
const bitbucket_api = require('bitbucket')


class GitController {

    constructor({token, username, password}, git_service) {
        this.token = token;
        this.git_service = git_service;
        
        this.initUser({username, password})
    }
    
    initUser({username, password}) {
        this.user = {
            username, password
        }
    }

    auth(type = typeauth.with_userdata) {
        let data_for_auth;
        if (type === typeauth.with_userdata) {
            data_for_auth = {
                username: this.user.username,
                password: this.user.password
            }
        } else if (type === typeauth.with_token) {
            data_for_auth = {
                token: this.token
            }
        } else {
            throw Error('not supported auth type')
        }
        
        
        // auth
        const gh = new github_api(data_for_auth)
        const user = gh.getUser(data_for_auth.username);
        console.log(data_for_auth, gh, user);
        
        this.local_auth = { 
            gh: user
        }

    }
    
    set gitData({token, git_service}) {
        this.token = token;
        this.git_service = git_service;
    }
    
    get gitData() {
        return {
            token: this.token,
            git_service: this.git_service
        }
    }
    
    async getListRepos() {
        let res = [];

        if (this.local_auth && this.local_auth.gh) {
            try {
                res = await this.local_auth.gh.listRepos()
            } catch (error) {
                console.log(error);
            }
        }
        return res;
    }
    

    async createRepo(option) {
        if (this.local_auth && this.local_auth.gh) {

        }
    }
    
}

module.exports = {
    GitController,
    typeauth
}