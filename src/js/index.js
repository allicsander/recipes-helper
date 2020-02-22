import Search from './models/Search';



const state = {};
const controlSearch = async () => {
    const query = 'beans'; // TODO view

    if(query){
        state.search = new Search(query);

        await state.search.getResults();
        console.log("yummy yummy");
        console.log(state.search.recipes);
    }
};

document.querySelector('.search').addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});





