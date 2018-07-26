const recipeRepository = require('./recipe.repository');

class RecipeService {
	setRecipeRating(id, recipe) {
		return recipeRepository.findOneAndUpdate({ _id: id }, {$set: {rating: recipe.rating}});
	}
	getAllRecipes() {
		return recipeRepository.findAll();
	}

	getRecipeById(id) {
		return recipeRepository.findById(id);
	}

	addRecipe(recipe) {
		return recipeRepository.add(recipe);
	}

	updateRecipe(id, recipe) {
		return recipeRepository.update({ _id: id }, recipe);
	}

	deleteRecipe(id) {
		return recipeRepository.delete({ _id: id });
	}
}

module.exports = new RecipeService();