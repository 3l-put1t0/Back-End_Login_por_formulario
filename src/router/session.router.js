import { Router } from "express";

import userModel from "../DAO/models/users.model.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({ email, password });
    if (!user) {
        return res.status(501).send({ status: 'error', method: 'post', message: 'No esta registrado el usuario' });
        // return res.status(501).send({ status: 'error', method: 'post', message: 'No esta registrado el usuario' }).redirect('/register');
    };
    req.session.user = user;
    res.status(201).send({ status: 'success', method: 'post', message: 'Se logueo el usuario' });
    // res.status(201).send({ status: 'success', method: 'post', message: 'Se logueo el usuario' }).redirect('/products');    
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role, age } = req.body;
    console.log(req.body);
    if (!firstName || !email || !password) return res.status(404).send({ status: 'error', method: 'post', message: 'Faltan datos del usuario' });
    const user = { firstName, lastName, email, password, role, age };
    await userModel.create(user);
    res.status(201).send({ status: 'success', method: 'post', message: 'se registro el usuario' })
});


router.post('/logout', (req, res) => {
    console.log('cerrar sesión');
    const { logout } = req.body;
    if (logout) {
        req.session.destroy((err) => {
            if (!err) {
                res.status(201).send({ status: "success", message: 'logout' });
            } else res.send({ status: "error", message: err })
        });
    }
});


export default router