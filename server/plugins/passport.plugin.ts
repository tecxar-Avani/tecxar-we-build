// import { AuthService } from '@services/auth.service';
import { Request } from 'express';

// const verify: VerifyFunctionWithRequest = async (req: Request, email, password, done) => {
//   try {
  
//     if (getCustomerByEmail) {
//       const getSchemaData = await customerService.getSchema(getCustomerByEmail && getCustomerByEmail.schemaId);
//       // if (getCustomerByEmail.is_verified === 'yes') {
//       const customerObj = {
//         custId: getCustomerByEmail.id,
//         first_name: getCustomerByEmail.first_name,
//         last_name: getCustomerByEmail.last_name,
//         email: getCustomerByEmail.email,
//         password: password,
//         phone: getCustomerByEmail.phone,
//         role_id: getCustomerByEmail.role_id,
//         schemaId: getCustomerByEmail.schemaId,
//         userGuideFlag: getCustomerByEmail.userGuideFlag,
//         is_verified: getCustomerByEmail.is_verified,
//         schemaName: getSchemaData && getSchemaData.schemaName,
//       };
//       const authService = new AuthService();
//       const checkPassword = await authService.checkPassword(password, getCustomerByEmail?.password);
//       if (!checkPassword) {
//         process.nextTick(() => done({ status: 400, message: 'Passwords does not match' }, null));
//       } else {
//         done(null, customerObj);
//       }
//       // } else {
//       //   process.nextTick(() => done({ status: 401, message: 'Account is not verified' }));
//       // }
//     } else {
//       return done({ status: 400, message: 'No User Found' }, null);
//     }
//   } catch (error) {
//     console.log('error', error);
//     process.nextTick(() => done(error, null));
//   }
// };

// const strategy = new LocalStrategy({ passReqToCallback: true, usernameField: 'email', passwordField: 'password' }, verify);

// export default strategy;
