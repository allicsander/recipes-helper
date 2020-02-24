import axios from 'axios';
import {proxy, app_id, app_key} from './Config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`${proxy}https://api.edamam.com/search?r=${this.id}&app_id=${app_id}&app_key=${app_key}`);
            this.title = res.data[0].label;
            this.image = res.data[0].image;
            this.url = res.data[0].url;
            this.author = res.data[0].source;
            this.ingredients = res.data[0].ingredients;

          //  console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil( numIng/3 );
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }
}