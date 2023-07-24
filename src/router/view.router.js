import { Router } from "express"; 

const router = Router();

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/products', (req, res) => {
    console.log('products: ', req.session);
    res.render('products', {
        user: req.session.user,
    });
});

export default router;