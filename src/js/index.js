import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likesView from './views/likesView';
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
       
        try{
            await state.search.getResults();
            console.log("yummy yummy");
           // console.log(state.search.recipes);
    
            clearLoader();
    
            searchView.renderResults(state.search.recipes);
        }catch(error){
            console.log(error);
            clearLoader();
        }
        

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



// const recipe = new Recipe('http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408');
// recipe.getRecipe();

// console.log(recipe);

const controlRecipe = async () =>{
    const id = encodeURIComponent(window.location.hash.replace('#',''));
    console.log(id);  

    if(id){

        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);

     try{
        
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        state.recipe.calcTime();
        state.recipe.calcServings();

        clearLoader();
        recipeView.renderRecipe(state.recipe, state.likes.isLiked(id)); 

     }catch(error){
         console.log(error);
     }
        
    }
}


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlShoppingList = () => {
    if(! state.shoppingList){
        state.shoppingList = new ShoppingList();
    }

    state.recipe.ingredients.forEach( el => {
        const item = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
        shoppingListView.renderItem(item);
    });

}

const controlLikes = () =>{
    if(!state.likes){
        state.likes = new Likes();
    }
    const currentID = state.recipe.id;

    if(!state.likes.isLiked(currentID)){

        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        likesView.toggleLikeBtn(true);
        likesView.renderLike(newLike);


       
    }else{
        state.likes.deleteLike(currentID);

        likesView.toggleLikeBtn(false);
        likesView.deleteLike(currentID);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());

}

window.addEventListener('load', () => {
    state.likes = new Likes();
    
    state.likes.readStorage();

    likesView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => likesView.renderLike(like));
});




elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    
        state.shoppingList.deleteItem(id);
        shoppingListView.deleteItem(id);

  
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.shoppingList.updateCount(id, val);
    }
});



elements.recipe.addEventListener('click', e =>{

    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
       
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
       
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe); 
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlShoppingList();

    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLikes();
    }

});



