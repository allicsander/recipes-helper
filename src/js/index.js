import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


const state = {};
const controlSearch = async () => {
    const query = searchView.getInput();
    console.log(query);

    if(query){
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);
       

        await state.search.getResults();
        console.log("yummy yummy");
       // console.log(state.search.recipes);

        clearLoader();

        searchView.renderResults(state.search.recipes);
    }
};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.page, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});



