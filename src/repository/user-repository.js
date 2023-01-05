const { User , Role} = require('../models/index');
const ValidationError = require('../utils/validation-error');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;            
        } catch (error) {
            if(error.name == 'sequelizeValidationError'){
                // let validationError = new ValidationError(error);
                // console.log(error.name);
                throw new ValidationError(error);
            }    
            console.log("Something Went Wrong on Repository Layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
             await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
            
        } catch (error) {
            console.log("Something Went Wrong on Repository Layer");
            throw error;
        }
    }

    async getById(userId){
        try {
           const user = await User.findByPk(userId,{
            attributes: [ 'email', 'id'  ]
           } );
          
           return user;
        } catch (error) {
            console.log("Something Went Wrong on Repository Layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            if(!user){
                
            }

            return user;
        } catch (error) {
            con
            console.log("Something went wrong in the REpository layer while comparing the password", error);
            throw error;
        }
    }
    async isAdmin(userId){
        try {
            const user= await User.findByPk(userId);
            const adminRole = await Role.findOne(
                {where:{
                    name: 'ADMIN'
                }}
            );
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in the REpository layer ");
            throw error;
        }
    }
}

module.exports = UserRepository;