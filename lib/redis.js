import {Client,Entity,Schema,Repository} from 'redis-om'

const client =new Client();

async function connect(){
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}
class Car extends Entity {}

    let schema = new Schema(
        Car,
        {
            make:{type:'string'},
            model:{type:'string'},
            image:{type:'string'},
            description:{type:'text',textSearch:true}
        },
        {
            dataStructure:'JSON'
        }
        
    );

    export async function createCar(data){
        try {
            await connect();
            const repository = client.fetchRepository(schema)
            const car =repository.createEntity(data)
            console.log(car,`carr<<<`);
            const id =await repository.save(car)
            console.log(`id>>>`,id);
            return id;
            
        } catch (error) {
            console.log(error,`<<<error`);
        }

    }
export async function createIndex(){
    await connect();
    const repository = client.fetchRepository(schema)
    await repository.createIndex()
}

export async function searchCar(q){
    await connect(); //

    const repository = client.fetchRepository(schema)

   const cars = repository.search()
   .where
   ('make').eq(q)
   .or('model').eq(q)
   .or
   ('description').match(q)
   .returnAll();

   return cars;
}