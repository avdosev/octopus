const BitbucketApi = require('bitbucket')
const { typeauth } = require('./const_for_class')

class Bitbucket {
    constructor({token, username, password}) {
        this.bitbucket = new BitbucketApi()
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
        this.bitbucket.authenticate({
            type: 'basic',
            username: this.user.username,
            password: this.user.password
        })
        this.local_auth = true;
    }

    async getListRepos(username = null) {
        let res = [];

        if (!this.local_auth) {
            throw Error('you are not auth');
        }

        try {
            res = await this.bitbucket.repositories.list({username: username || this.user.username})
            // todo parse response
        } catch (error) {
            console.log(error);
        }
        try { console.log('data from bitbucket', res.data.values[0]) } catch {}

        res = res.data.values.reduce((acc, cur) => {
            const str = cur.links.html.href
            let item = {
                name: cur.name,
                html_url: str.substring(str.indexOf('bitbucket.org')+'bitbucket.org'.length),
                repo_indent: cur.uuid,
                account_indent: cur.owner.uuid
            }
            acc.push(item)
            return acc;
        }, [])
        return res;
    }

    getUser(username = null) {
        return this.user(username || this.user.username)
    }

    async createRepo({name, description, is_public}) {
        try {
            await this.bitbucket.repositories.create({
                username: this.user.username,
                repo_slug: name, 
                description, 
                'private': !is_public
            })
        } catch (error) {
            throw error;
        }
    }

    async deleteRepo(repo_indent, account_indent) {
        console.log(repo_indent, account_indent)
        try {
            const res = await this.bitbucket.repositories.delete({
                username: account_indent,
                repo_slug: repo_indent
            })
            console.log('bitbacket response after delete repo', res)
        } catch (err) {
            console.log(err)
            throw err.response
        }
    }

    async getProfile(username = null) {
        let res = {}
        try {
            // TODO
            if (!username) {
                res = await this.bitbucket.users.getAuthedUser()
            } else {
                // todu
            }
            res = res.data
            res = {
                username: res.username,
                avatar_url: res.links.avatar.href,
                // пока больше не нужно
            }
        } catch (err) {
            console.log(err)
            throw err.response
        }
        return res;
    }

    async getRepo(repo_indent, user_indent) {
        return await this.bitbucket.repositories.get({
            repo_slug: repo_indent,
            username: user_indent
        })
    }
}

module.exports = Bitbucket