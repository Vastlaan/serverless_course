const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-central-1'})

const documentClient = new AWS.DynamoDB.DocumentClient()
// ==============================================================================================================
// // create item in the table
let params = {
  TableName: "td_notes_sdk",
  Item: {
    user_id: "Boba",
    timestamp: 1636909165598,
    title: "SDK_TITLE_3",
    content: "ho ho ho!"
  }
}
// documentClient.put(params, (err, data)=>{
//   if(err){
//     return console.error('Error',err)
//   }
//   console.log(data)
// })

// ==============================================================================================================
// // update item in the table

params = {
  TableName: "td_notes_sdk",
  Key: {
    user_id: 'Bob',
    timestamp: 1636909165598
  },
  UpdateExpression: 'set #t = :t', // where #t is expression attribute name and :t is expression attribute value
  ExpressionAttributeNames: {
    '#t': 'title'                  // t this points to 'title' attribute within dynamodb
  },
  ExpressionAttributeValues: {
    ':t': "Updated title"
  }
}

// documentClient.update(params, (err, data)=>{
//   if(err)
//     return console.error(err)
//   else console.log(data)
// })

// ==============================================================================================================
// // delete item in the table

params = {
  TableName: 'td_notes_sdk',
  Key: {
    user_id: 'Boba',
    timestamp: 1636909165598
  },
}

// documentClient.delete(params, (err, data)=>{
//   if (err) 
//     console.error(err)
//   else console.log(data)
// })

// ==============================================================================================================
// // batchWrite allows for multiple creation or delete items
params = {
  RequestItems: {
    'td_notes_sdk': [
      {
        DeleteRequest: {
          Key: {
            user_id: "Boba",
            timestamp: 1636909165598,
          }
        }
      },
      {
        PutRequest: {
          Item: {
            user_id: "newUser",
            timestamp: 1636909165958
          }
        }
      }
    ]
  }
}

documentClient.batchWrite(params, (err, data)=>{
  if (err) 
    console.error(err)
  else console.log(data)
})