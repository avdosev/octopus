const github_api = require('github-api')
const { typeauth } = require('./const_for_class')
const {MarkdownToHtml} = require('../markdown')

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
        try { console.log('data from github', res.data[0]) } catch {}

        res = res.data.reduce((acc, cur) => {
            const str = cur.html_url
            
            let item = {
                name: cur.name,
                html_url: str.substring(str.indexOf('github.com')+'github.com'.length),
                repo_indent: cur.name,
                account_indent: cur.full_name.substring(0, cur.full_name.indexOf('/'))
                
            }
            acc.push(item)
            return acc;
        }, [])
        return res;
    }

    getUser(username = null) {
        return this.local_auth.getUser(username || this.user.username)
    }

    async createRepo({name, description, files, is_public}) {
        try {
            await this.getUser().createRepo({name, description, files, 'public': is_public})
        } catch (error) {
            throw error;
        }
    }
    
    async deleteRepo(repo_indent, account_indent) {
        try {
            await this.local_auth.getRepo(account_indent, repo_indent).deleteRepo()
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

    async getRepo(repo_indent, user_indent) {
        const repo = this.local_auth.getRepo(user_indent, repo_indent)
        // ррр
        // так не робит
        // const request = await Promise.all([repo.getContents() , repo.getReadme(undefined, true)]) 
        const files = (await repo.getContents()).data

        let readme = null
        
        try {
            readme = (await repo.getReadme(undefined, true)).data
            readme = MarkdownToHtml(readme)
        } catch (error) {
            console.log(error)
        }

        return {
            files,
            readme
        }
    }
}

module.exports = GithubController