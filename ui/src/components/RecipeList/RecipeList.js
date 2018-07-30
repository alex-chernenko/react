import React from 'react';
import { Image, Button, Card, Rating } from 'semantic-ui-react';
import dish from '../../assets/dish.jpg';

export default ({ recipes, onEdit, onDelete, onView, onRate }) =>
    recipes && recipes.map((recipe, index) => (
        <Card fluid key={index}>
            <Card.Content>
                <Image 
                    size="tiny" 
                    floated="left" 
                    src={dish} 
                />
                <Button 
                    circular 
                    color="red" 
                    icon="trash" 
                    floated="right" 
                    onClick={() => onDelete && onDelete(recipe._id)} 
                />
                <Button 
                    circular 
                    icon="pencil" 
                    floated="right" 
                    onClick={() => onEdit && onEdit(recipe._id)} 
                />
                <Button 
                    circular 
                    icon="eye" 
                    floated="right" 
                    onClick={() => onView && onView(recipe._id)} 
                />
                <Rating 
                    icon='star'
                    defaultRating={0} 
                    maxRating={5} 
                    rating = {recipe.rating}
                    onRate={(e, {rating}) => onRate && onRate(recipe._id, rating)}
                />
                <Card.Header style={{ marginTop: '1.5em' }}>
                    {recipe.title}
                </Card.Header>

                <Card.Description 
                    textAlign="left" 
                    className="recipe-description"
                >
                    {recipe.description}
                </Card.Description>
            </Card.Content>
        </Card>
    ));
 

