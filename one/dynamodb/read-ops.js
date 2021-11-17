const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-central-1'})

const documentClient = new AWS.DynamoDB.DocumentClient()

let params = {
  TableName: "td_notes_sdk",
  Key: {
    user_id: "Bob",
    timestamp: 1636909165598
  }
}

documentClient.get(params, (err, data)=>{
  if(err){
    console.error(err)
  }else{
    console.log(data)
  }
})

// query
params = {
  TableName: "td_notes_sdk",
  KeyConditionExpression: "user_id = :uid",
  ExpressionAttributeValues: {
    ":uid": "Bob"
  }
}
documentClient.query(params, (err, data)=>{
  if(err){
    console.error(err)
  }else{
    console.log(data)
  }
})

//scan
params = {
  TableName: "td_notes_sdk",
  FilterExpression: "title = :title",
  ExpressionAttributeValues: {
    ":title": "SDK_TITLE"
  }
}
documentClient.scan(params, (err, data)=>{
  if(err){
    console.error(err)
  }else{
    console.log(data)
  }
})

//batch get items

params = {
  RequestItems: {
    "td_notes_sdk":{
      Keys: [
        {
          user_id: 'newUser',
          timestamp: 1636909165958
        }
      ]
    }
  }
}
documentClient.batchGet(params, (err, data)=>{
  if(err){
    console.error('Error',err)
  }else{
    console.log(data.Responses.td_notes_sdk)
  }
})