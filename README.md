# controle-de-gastos-api



Run local DB:

1. [Download DynamoDbLocal](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and put inside folder: `../utils/dynamodb_local`
1. Enter it and start dynamodb:

```shell
cd ../utils/dynamodb_local
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```