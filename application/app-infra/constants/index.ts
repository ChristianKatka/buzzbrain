export const projectNamePascal = "BuzzBrain";
export const projectName = "buzzbrain";

export const getCognitoUserPoolId = (envName: string) => {
  if (envName === "production") {
    return "eu-north-1_rCo10jtvy";
  }
  if (envName === "staging") {
    return "eu-north-1_PVPJEgvyk";
  }
  return "";
};

export const getCognitoClientId = (envName: string) => {
  if (envName === "production") {
    return "7ji2h94r9s3arqfbfemjdq6bhd";
  }
  if (envName === "staging") {
    return "5ir5mis4018ie39cs4kit0sfje";
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
