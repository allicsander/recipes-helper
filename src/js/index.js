import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';


const state = {};
const controlSearch = async () => {
    const query = searchView.getInput();
    console.log(query);

    if(query){
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();

        await state.search.getResults();
        console.log("yummy yummy");
        console.log(state.search.recipes);

        searchView.renderResults(state.search.recipes);
    }
};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});





