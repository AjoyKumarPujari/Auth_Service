const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

class UserService{

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try{
            const user= await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log("Something went wrong in the service layer");
            throw error;

        }
    }
    async signIn(email, plainPassword){
        try {
            //step 1: fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2: compare incomming password to stored encrypted password
            const passwordMatch = this.checkedPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.log("password Doesnot Match");
                throw{error:'Incorrect Password'};
            }
            //step 3:if password match then create the token and send it to user
            const newJwt = this.createToken({email:user.email, id:user.id});
            return  newJwt;

        } catch (error) {
            console.log("Something went wrong in the service layer while sign in");
            throw error;
        }
    }

    async isAuthenticated (token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw { error: "invalid Token"}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw { error: "No user with the corrosponding token exists"};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the service layer while Authenticate");
            throw error;
        }
    }


     createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY,{expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;

        }
     }

     verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            throw error;
        }
     }



     checkedPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        
     } catch (error) {
        console.log("Something went wrong in the service layer while comparing the password", error);
        throw error;
     }
    }

    
}
module.exports = UserService;