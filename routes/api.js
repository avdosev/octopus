const express = require('express');
const router = express.Router();

const {
    userCreateValidator,
    userLoginValidator
} = require('../services/validator');

module.exports = (passport) => {
    router.post(
        '/logout', 
        (req, res) => {
            req.session.destroy(err => {
                res.redirect('/');
                console.log(err)
            })
        }
    );

    router.post(
        '/register',
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        }),
    );

    router.post(
        '/signin', 
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin'
        })
    );

    router.post('/new_account', (req, res, next) => {
        req.user.gitControll.addAccount(req.body)
        next()
    }, (req, res) => {
        res.redirect('/')
    })

    router.post('/swap_account', async (req, res, next) => {
        const new_id = req.body.new_id
        console.log("newid: ",new_id)
        try {
            await req.user.gitControll.setCurrentControll(new_id)
        } catch (err) {
            console.log(err)
        }
        res.send('ok')
    })

    router.delete('/remove_repo', async (req, res, next) => {
        const contrl = req.user.gitControll.getCurrentControll()
        if (!contrl) {
            res.send('none')
            return;
        }

        await contrl.deleteRepo(req.body.repo_indent, req.body.account_indent)

        res.send('ok')
    })

    router.post('/create_repo', async (req, res, next) => {
        const body = req.body;

        const contrl = req.user.gitControll.getCurrentControll()
        if (contrl) {
            try {
                await contrl.createRepo(body)
            } catch (err) {
                console.log('ошибка при создании репозитория: ', err);
            }
        }

        res.redirect('/')
    })

    return router
}