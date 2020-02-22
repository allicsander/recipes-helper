 import axios from 'axios';
 import {proxy, app_id, app_key} from './models/Search';


async function getResults(query){
    try{
        const res = await axios(`${proxy}https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}&from=0&to=3&calories=591-722&health=alcohol-free`);

        const recipes = res.data.hits;
        console.log(recipes);
    }catch(error){
        console.log(error);
    }
     
}

getResults('chicken');