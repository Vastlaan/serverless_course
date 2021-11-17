const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-central-1'})

const documentClient = new AWS.DynamoDB.DocumentClient()

const params = {
  TableName: 'td_notes_sdk',
  Item: {
    user_id: 'Bob',
    timestamp: Date.now(),
    title: "SUPERHERO",
    content: "This is with condition"
  },
  ConditionExpression: "#t <> :t",
  ExpressionAttributeNames: {
    '#t': 'timestamp'
  },
  ExpressionAttributeValues: {
    ':t': 12
  }
}
// documentClient.put(params, (err, data)=>{
//   if(err){
//     return console.error(err)
//   }
//   else{
//     console.log(data)
//   }
// })