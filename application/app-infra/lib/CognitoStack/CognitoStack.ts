import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createUserPool } from "./utils/createUserPool";
import { createUserPoolClient } from "./utils/createUserPoolClient";

interface Props extends StackProps {
  envName: string;
}

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    const userPool = createUserPool(this, envName);

    createUserPoolClient(this, envName, userPool);
  }
}
