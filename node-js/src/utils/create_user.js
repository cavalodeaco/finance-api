const dotenv = require("dotenv");
dotenv.config();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
/*
Reason for importding node-fetch to global.fetch is because of amazon-cognito-identity-js package. It’s a javascript library meant for web browser and it uses fetch in library. Since nodejs don’t have fetch in built we have to emulate it like that.
*/

const poolData = {
  UserPoolId: process.env.USER_POOL_ID, // Your user pool id here
  ClientId: process.env.CLIENT_ID, // Your client id here
};
const pool_region = process.env.AWS_REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function RegisterUser() {
  var attributeList = [];
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: "finance",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "preferred_username",
      Value: "finance",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:viewer",
      Value: "true",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:manager",
      Value: "false",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:creator",
      Value: "true",
    })
  ); // quem gerencia falta e certificado
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: "finance@gmail.com",
    })
  );

  userPool.signUp(
    "finance@gmail.com",
    "finance12345",
    attributeList,
    null,
    function (err, result) {
      if (err) {
        console.info(err);
        return;
      }
      console.info("user name is " + JSON.stringify(result.user));
    }
  );
}

// function Login() {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username : 'teste@gmail.com',
//         Password : 'teste12345',
//     });

//     var userData = {
//         Username : 'teste@gmail.com',
//         Pool : userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             console.info('access token + ' + result.getAccessToken().getJwtToken());
//             console.info('id token + ' + result.getIdToken().getJwtToken());
//             console.info('refresh token + ' + result.getRefreshToken().getToken());
//         },
//         onFailure: function(err) {
//             console.info(err);
//         },

//     });

// }

RegisterUser();
// Login();
