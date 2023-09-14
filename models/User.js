// // const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { EmptyResultError } = require('sequelize');
const StrongPassword = require('strongpassword');
// const strongpassword = require('strongpassword');
// // const sequelize = require('../config/connection');

// class MightyPassword extends User{
//   check_strength(loginPw){
//     console.log(log)
//   }

// }
// let strongPasswordValidation = new strongpassword({
//   password: newUser.login,
//   locale:   'en_US',
//   minimumLength: 10,
//   minimumWords:  4,
//   numbers:      (true),
//   lowercase:    (true),
//   uppercase:    (true),
// })
// console.log(strongPasswordValidation.isStrong);
// class User {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// This is for testing, it will change once variables are set for the password
  // In this example I am using simply using variables to check the streng in a class
class User {
  checkPassword(loginPw) {
    let newloginPw = 'Hello This is Awesome 58423';
    loginPw = newloginPw;
    newloginPw = new StrongPassword({
      password: loginPw,
  locale:   'en_US',
  minimumLength: 10,
  numbers:      (true),
  lowercase:    (true),
  uppercase:    (true),
    })
    console.log('Password Strong:','[' + newloginPw.isStrong + '] \n');
    console.log(newloginPw.password+ '\n');
    // Testing the hash value with the plain text
    let plainpassword = 'fuubaar';
    bcrypt.hash(plainpassword, 4, function(err, hash) {
      console.log(hash + '\n');
      console.log('Text matches hash', '[' + bcrypt.compareSync(plainpassword,hash) + '] \n');
  });
  }
}
newUser = new User
newUser.checkPassword();

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [8],
//       },
//     },
//   },
//   {
//     hooks: {
//       beforeCreate: async (newUserData) => {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//       beforeUpdate: async (updatedUserData) => {
//         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//         return updatedUserData;
//       },
//     },
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'user',
//   }
// );

// module.exports = User;
