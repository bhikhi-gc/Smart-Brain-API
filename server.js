import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signIn.js';
import { handleImage, handleAPICall } from './controllers/image.js';
import { handleProfile } from './controllers/profile.js';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'smart_brain'
  }
});

//db.select('*').from('users').then( (data) => {console.log(data)});

const saltRounds = 10;

app.get('/', (req, res) => { res.send('Success');});

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt)} );

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt, saltRounds)});

app.put('/image', (req, res) => { handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => { handleAPICall(req, res)});

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db)});
//const PORT = process.env.PORT;

app.listen(3000, () => {
	console.log(`App is listening to port 3000`)
});