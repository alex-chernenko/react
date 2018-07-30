import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Image, Grid, Segment } from 'semantic-ui-react';
import { fetchAllRecipes, deleteRecipe, setRating } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import logo from '../../assets/logo.png';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader';
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import './Recipes.css'

class Recipes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRecipe: null,
            search: ""
        };
    }

    componentDidMount() {
        this.props.actions.fetchAllRecipes();
    }

    handleDelete = id => {
        this.props.actions.deleteRecipe(id);
    }

    handleEdit = id => {
        this.props.history.push(`/recipes/${id}`);
    }

    handleRecipeCreate = () => {
        this.props.history.push(`/recipes/new`);
    }

    handleRating = (id, rating) => {
        let recipe = this.props.allRecipes.find(r => r._id === id);
        recipe.rating = rating;
        this.props.actions.setRating(recipe);
    }

    toggleRecipeModal = id => {
        this.setState({
            activeRecipe: this.props.allRecipes.find(r => r._id === id)
        })
    }

    handleModalClose = () => {
        this.toggleRecipeModal(null);
    }
    search = text => {
        this.setState({
            search: text
        })
    }

    searchRecipes = (search, allRecipes) => {
        var searchedRecipes = [];
            for (let i = 0; i < allRecipes.length; i++) {
                let recipe = allRecipes[i].title.toLowerCase();
                let text = search.toLowerCase()
                if (recipe.indexOf(text) !== -1) {
                    searchedRecipes.push(allRecipes[i]);
                }
            }
            return searchedRecipes;   
        } 

    sort(allRecipes) {
        
        allRecipes.sort(function(a, b) {
                    return  b.rating - a.rating
                }) 
    
            return allRecipes;
    }
    
   

        
    
    
    

    render() {
        const { isFetching, allRecipes } = this.props;
        const { activeRecipe, search } = this.state;
        let filteredRecipes = this.searchRecipes(search, allRecipes);
        
        return (<Container>
            <Grid centered columns={1}>
                <Grid.Column>
                    <Image src={logo}
                            size="tiny"  centered />
                </Grid.Column>
                <Grid.Row>
                    <Grid.Column>
                        <Segment raised padded textAlign="center" loading={isFetching}>
                            {!allRecipes.length && !isFetching
                                ? <EmptyRecipeList 
                                    onCreate={this.handleRecipeCreate} 
                                />
                                : <React.Fragment>
                                    <RecipeListHeader
                                        onCreate={this.handleRecipeCreate} 
                                        onChange={this.search}
                                        onClick={this.sort(filteredRecipes)}
                                        listLength={allRecipes.length}
                                        /> 
                                    <RecipeList 
                                        recipes={filteredRecipes} 
                                        onView={this.toggleRecipeModal} 
                                        onDelete={this.handleDelete} 
                                        onEdit={this.handleEdit} 
                                        onRate={this.handleRating}
                                    />
                                </React.Fragment>
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <RecipeModal 
                recipe={activeRecipe} 
                onClose={this.handleModalClose} 
            />
        </Container>)
    }
}

Recipes.propTypes = {
    allRecipes: PropTypes.array,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    allRecipes: allRecipes(state),
    isFetching: isRecipesFetching(state)
});

const mapDispatchToProps =  dispatch => ({
    actions: bindActionCreators({fetchAllRecipes,deleteRecipe,setRating }, dispatch)
});

export default connect(mapStateToProps,  mapDispatchToProps)(Recipes);