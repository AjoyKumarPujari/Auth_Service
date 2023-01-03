const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

const UserService = require ('./services/user-service');

//const UserRepository = require('./repository/user-repository');

const prepareAndStartServer = () => {

 app.use(bodyParser.json());

 app.use(bodyParser.urlencoded({extended: true}));

 app.use('/api', apiRoutes);

 app.listen(PORT, async() => {
    console.log(`Server Get Started on Port: ${PORT}` );

    const service = new UserService();
    // const newToken = service.createToken({email:'John@admin.com', id:1});
    // console.log("New Token is ", newToken);

    // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkpvaG5AYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTY3Mjc1Nzg0OSwiZXhwIjoxNjcyNzYxNDQ5fQ.-4OQrBdiuEM28sJATDzmePY41Y_-AZo2t1YuO_EgeUQ";
    // const response = service.verifyToken(token);
    // console.log(response);

   
    // const repo = new UserRepository();
    // const response = await repo.getById(2);
    // console.log(response);
 });
}

prepareAndStartServer();