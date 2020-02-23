import axios from 'axios';
import {proxy, app_id, app_key} from './Config';

export default class Search{
    constructor(query){
        this.query = query;

    }

    async getResults(){
        try{
            const res = await axios(`${proxy}https://api.edamam.com/search?q=${this.query}&app_id=${app_id}&app_key=${app_key}&from=0&to=10&calories=591-722&health=alcohol-free`);
    
            this.recipes = res.data.hits;
            //console.log(this.recipes);
        }catch(error){
            console.log(error);
        }
         
    }

}