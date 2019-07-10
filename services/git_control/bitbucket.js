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
        
        res = res.data.values.reduce((acc, cur) => {
            const str = cur.links.html.href
            let item = {
                name: cur.name,
                html_url: str.substring(str.indexOf('bitbucket.org')+'bitbucket.org'.length)
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

    async deleteRepo(reponame) {
        try {
            await this.bitbucket.repositories.delete()
        } catch (err) {
            throw err.response.data
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