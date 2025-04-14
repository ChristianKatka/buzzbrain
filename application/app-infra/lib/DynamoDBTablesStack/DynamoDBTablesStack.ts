import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createGameCategoriesDynamoTable } from "./utils/createGameCategoriesDynamoTable";
import { createGamesDynamoTable } from "./utils/createGamesDynamoTable";
import { createUserDataDynamoTable } from "./utils/createUserDataDynamoTable";
import { createUsersDynamoTable } from "./utils/createUsersDynamoTable";

interface Props extends StackProps {
  envName: string;
}

export class DynamoDBTablesStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    createUsersDynamoTable(this, envName);
    createUserDataDynamoTable(this, envName);
    createGameCategoriesDynamoTable(this, envName);
    createGamesDynamoTable(this, envName);
  }
}
