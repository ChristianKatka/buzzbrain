import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createUsersDynamoTable } from "./utils/createUsersDynamoTable";

interface Props extends StackProps {
  envName: string;
}

export class DynamoDBTablesStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    const userPool = createUsersDynamoTable(this, envName);
  }
}
