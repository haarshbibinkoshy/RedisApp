import {createCar} from "../../lib/redis"

export default async function handler(req,res){
    console.log(`reqbody>>>`,req.body);
    const id =await createCar(req.body);
    res.status(200).json({id})
    // res.json({asd:13})
}