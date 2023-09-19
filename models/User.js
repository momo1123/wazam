// const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
// // const { EmptyResultError } = require('sequelize');
// const StrongPassword = require('strongpassword');
// // const strongpassword = require('strongpassword');
// const sequelize = require('../config/connection');

// // ** Strong password check TEMPLATE **
// // let strongPasswordValidation = new StrongPassword({
// //    password: newuser_login,
// //    locale: 'en_US',
// //    minimumLength: 10,
// //    // minimumWords: 4,
// //    numbers: true,
// //    lowercase: true,
// //    uppercase: true,
// // });
// // console.log(strongPasswordValidation.isStrong);

// //  ** This class of User tests the functionality of brcypt **
// // class User extends Model {
// //    checkPassword(loginPw) {
// //       return bcrypt.compareSync(loginPw, this.password);
// //    }
// // }

// class User extends Model {
//    checkPassword(loginPw) {
//       let newLoginPassword = 'Hello This is Awesome 58423';
//       loginPw = newLoginPassword;
//       newLoginPassword = new StrongPassword({
//          password: loginPw,
//          locale: 'en_US',
//          minimumLength: 10,
//          numbers: true,
//          lowercase: true,
//          uppercase: true,
//       });
//       console.log('Password Strong:', '[' + newLoginPassword.isStrong + '] \n');
//       console.log(newLoginPassword.password + '\n');
//       // Testing the hash value with the plain text
//       let plainPassword = 'fuubaar';
//       bcrypt.hash(plainPassword, 10, function (err, hash) {
//          console.log(hash + '\n');
//          console.log(
//             'Text matches hash',
//             '[' + bcrypt.compareSync(plainPassword, hash) + '] \n'
//          );
//       });
//    }
// }
// class MightyPassword extends User {
//    check_strength(loginPw) {
//       console.log(log);
//    }
// }

// // This is for testing, it will change once variables are set for the password
// // In this example I am simply using variables to check the strength in a class

// User.init(
//    {
//       id: {
//          type: DataTypes.INTEGER,
//          allowNull: false,
//          primaryKey: true,
//          autoIncrement: true,
//       },
//       name: {
//          type: DataTypes.STRING,
//          allowNull: false,
//       },
//       email: {
//          type: DataTypes.STRING,
//          allowNull: false,
//          unique: true,
//       },
//       password: {
//          type: DataTypes.STRING,
//          allowNull: false,
//       },
//    },
//    {
//       hooks: {
//          beforeCreate: async (newUserData) => {
//             newUserData.password = await bcrypt.hash(newUserData.password, 10);
//             return newUserData;
//          },
//          beforeUpdate: async (updatedUserData) => {
//             updatedUserData.password = await bcrypt.hash(
//                updatedUserData.password,
//                10
//             );
//             return updatedUserData;
//          },
//       },
//       sequelize,
//       timestamps: false,
//       freezeTableName: true,
//       underscored: true,
//       modelName: 'user',
//    }
// );

// newUser = new User();
// newUser.checkPassword();
// module.exports = User;

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const checkPasswordStrength = require('check-password-strength');

class User extends Model {
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
}

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: true,
         },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [8],
         },
      },
   },
   {
      hooks: {
         beforeCreate: async function (newUserData) {
            const passwordStrength = checkPasswordStrength.passwordStrength(
               newUserData.password,
            ).value;
            console.log(
               `checkPasswordStrength.passwordStrength(${passwordStrength})`,
            );
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         },
         beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(
               updatedUserData.password,
               10,
            );
            return updatedUserData;
         },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
   },
);

module.exports = User;
