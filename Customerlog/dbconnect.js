let {MongoClient}=require('mongodb')

let url='mongodb://localhost:27017'

let Client= new MongoClient(url)

let dbName='Demo1'
console.log('Mongodb Connected')
async function  dbconnect()
{
    await Client.connect()

    let db=Clipboard.db(dbName)
    let collection=db.collection('customerlog')
    return collection
}
module.exports=dbconnect