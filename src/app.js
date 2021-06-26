import express from 'express';
import load from 'dotenv';
import path from 'path';

import DBConnection from './db/DBConnection'
import usersRouter from './routers/users';
import teamsRouter from './routers/teams';

load.config();
 
console.log(`Connecting to ${process.env.MONGODB_URL} uri`);

DBConnection(process.env.MONGODB_URL)
  .then(() => console.log('Connection ok'))
  .catch(error => console.log('Connection to MongoDB failed'));

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRouter);
app.use('/teams', teamsRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
