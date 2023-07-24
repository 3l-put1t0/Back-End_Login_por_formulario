import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";

import __dirname from "./src/util.js";
import sessionRouter from "./src/router/session.router.js"
import viewRouter from './src/router/view.router.js';

const URL = 'mongodb+srv://Secas:mongoDB$123@cluster0.wbsfiqg.mongodb.net/ecommerce?retryWrites=true&w=majority';
const keySession= 'k3y#$Secret';
const app = express();

try{ 
    mongoose.connect(URL);
} catch(er){ 
    console.log('ERROR CONNECT MONGOSE') 
}

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(session({
    //  Va a generar una colección donde se guarda la sesión respectiva, esto
    // con el fin de sostener la sesión si se llega a caer los servicios 
    store: MongoStore.create({
        mongoUrl: URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 150
    }),
    secret: keySession,  //  Firma para encriptar la sesión
    resave: true,
    saveUninitialized: true    
}));

app.use('/', viewRouter);
app.use('/api', sessionRouter);

app.listen(8080, console.log('LISTENNIG ON PORT 8080'));