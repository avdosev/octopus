const BitbucketApi = require('bitbucket')
const { typeauth } = require('./const_for_class')

class Bitbucket {
    // TODO!!!!!!!!
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

    async createRepo({name, description, files}) {
        try {
            await this.bitbucket.repositories.create({name, description, files})
        } catch (error) {
            throw error.response.data;
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
        try {
            // TODO
            return {}
            //return (await this.getUser(username).getProfile()).data
        } catch (err) {
            throw err.response.data
        }
    }
}

module.exports = Bitbucket