import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export const createUserPool = (stack: Construct, envName: string) => {
  const userPool = new cognito.UserPool(stack, "UserPool", {
    userPoolName: `${envName}---user-pool`,
    signInAliases: {
      email: true,
    },
    selfSignUpEnabled: true, // 👈 Allow users to sign themselves up
    autoVerify: { email: true },
    passwordPolicy: {
      minLength: 6,
      requireUppercase: false,
      requireLowercase: false,
      requireDigits: false,
      requireSymbols: false,
    },
    mfa: cognito.Mfa.OFF,
    standardAttributes: {
      email: {
        required: true,
        mutable: true,
      },
    },
  });

  return userPool;
};
