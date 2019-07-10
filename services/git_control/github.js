const github_api = require('github-api')
const { typeauth } = require('./const_for_class')

class GithubController {
    constructor({token, username, password}) {
        this.token = token;
        // тут вызывается геттер 
        // так що не исправляй, так и задумывалось, наверно
        this.user = {username, password}
    }

    set user({username, password, token}) {
        this._user = {
            username, password, token
        }
        this.auth()
    }

    get user() {
        return this._user
    }

    auth() {
        let data_for_auth = this.user

        // auth
        const gh = new github_api(data_for_auth)
        
        this.local_auth = gh

    }

    async getListRepos(username = null) {
        let res = [];

        if (!this.local_auth) {
            throw Error('you are not auth');
        }

        try {
            let user = this.local_auth.getUser(username || this.user.username)
            // todo parse response
            res = await user.listRepos()
        } catch (error) {
            console.log(error);
        }

        res = res.data.reduce((acc, cur) => {
            const str = cur.html_url
            let item = {
                name: cur.name,
                html_url: str.substring(str.indexOf('github.com')+'github.com'.length)
            }
            acc.push(item)
            return acc;
        }, [])
        return res;
    }

    getUser(username = null) {
        return this.local_auth.getUser(username || this.user.username)
    }

    async createRepo({name, description, files}) {
        try {
            await getUser().createRepo({name, description, files})
        } catch (error) {
            throw error.response.data;
        }
    }

    async deleteRepo(reponame) {
        try {
            await this.local_auth.getRepo(this.user.username, reponame).deleteRepo()
        } catch (err) {
            throw err.response.data
        }
    }

    async getProfile(username = null) {
        try {
            return (await this.getUser(username).getProfile()).data
        } catch (err) {
            throw err.response.data
        }
    }
}

module.exports = GithubController