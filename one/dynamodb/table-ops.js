const AWS = require('aws-sdk')

AWS.config.update({region: 'eu-central-1'})

const dynamodb = new AWS.DynamoDB()

// ==============================================================================================================
// create table
let params ={
  TableName: "td_notes_sdk",
  AttributeDefinitions: [
    {
      AttributeName: "user_id",
      AttributeType: "S"
    },
    {
      AttributeName: 'timestamp',
      AttributeType: "N"
    }
  ],
  KeySchema: [
    {
      AttributeName: "user_id", 
      KeyType: "HASH"             // equivalent index(primary) key
    },
    {
      AttributeName: "timestamp",
      KeyType: "RANGE"            // equivalent sort key
    }
  ],
  BillingMode: 'PAY_PER_REQUEST', // provisionedThroughput: onDemand
}

dynamodb.createTable(params, (err, data)=>{
  console.log('CREATE TABLE')
  if(err){
    return console.log(err)
  }
  console.log(data)
})
// ==============================================================================================================
// ==============================================================================================================
// list tables
params = {}
dynamodb.listTables(params, (err, data)=>{
  console.log('LIST TABLES')
  if(err){
    return console.log(err)
  }
  console.log(data)
})
// ==============================================================================================================
// view table details
params = {
  TableName: "td_notes_sdk"
}
dynamodb.describeTable(params, (err, data)=>{
  console.log('DESC TABLES')
  if(err){
    return console.log(err)
  }
  console.log(data)
  console.log(data.Table.AttributeDefinitions)
})
// // update table
// dynamodb.updateTable({},(err,data)=>{})
// ==============================================================================================================
// // delete table
// dynamodb.deleteTable({},(err,data)=>{})
// ==============================================================================================================
