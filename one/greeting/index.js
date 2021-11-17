const {DateTime} = require('luxon')

const greeting = {
  default: 'Welcome in the hell',
  nl: "Welkom in de hell",
  pl: "Witaj w piekle"
}

exports.handler = async (event, context) =>{

  const name = event.pathParameters?.name || "Visitor"
  const { lang, ...info} = event.queryStringParameters || {}
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"*"
    },
    body: ""
  }

  try{
    const message = `${greeting[lang || 'default']} ${name}!`
    const timestamp = DateTime.fromMillis(Date.now())
  
    const body = JSON.stringify({
      message,
      info,
      timestamp
    })
    response.body = body
  }catch(e){
    response.statusCode=500
    response.body = JSON.stringify({status: 'error', message: e.message})
  }


  return response
}