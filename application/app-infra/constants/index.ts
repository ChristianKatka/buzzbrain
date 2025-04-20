export const projectNamePascal = "BuzzBrain";
export const projectName = "buzzbrain";

export const getCognitoUserPoolId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "eu-north-1_SdFHvXFCk";
  }
  return "";
};

export const getCognitoClientId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "4m3ajj7778c2clcvnnc3nom8qn";
  }
  return "";
};

export const getAppBucketName = (envName: string) => {
  if (envName === "production") {
    return "buzzbrain-production---app";
  }
  if (envName === "staging") {
    return "buzzbrain-staging---app";
  }
  return "";
};
