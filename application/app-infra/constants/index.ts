export const projectNamePascal = "BuzzBrain";
export const projectName = "buzzbrain";

export const getCognitoUserPoolId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "eu-north-1_roCFnzGEP";
  }
  return "";
};

export const getCognitoClientId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "4q7lccaqh57mpbtmgjph302vto";
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
