#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AppInfraStack } from "../lib/app-infra-stack";

// Create CDK app
const app = new cdk.App();

// Get env from context (passed via -c env=staging or env=prod)
const envName = app.node.tryGetContext("env");

if (!envName) {
  throw new Error("Missing context: pass -c env=staging or -c env=production");
}

// Define environments
const environments: Record<string, cdk.Environment> = {
  staging: {
    account: "109464919621",
    region: "eu-north-1",
  },
  production: {
    account: "222222222222",
    region: "eu-north-1",
  },
};

const envConfig = environments[envName];

if (!envConfig) {
  throw new Error(`Invalid environment name: "${envName}"`);
}

const currentAccount = process.env.CDK_DEFAULT_ACCOUNT;

if (currentAccount && currentAccount !== envConfig.account) {
  throw new Error(
    `AWS Account mismatch: You are deploying to environment "${envName}" which expects account ${envConfig.account}, but your credentials are using ${currentAccount}`
  );
}

// Deploy the stack with env-specific config
new AppInfraStack(app, `BuzzBrainAppInfra-${envName}`, {
  stackName: `buzzbrain-${envName}---app-infra`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
});
