import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Image, Header, Button, Rating } from 'semantic-ui-react';
import dish from '../../assets/dish.jpg';


export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.initialValues.title,
            description: props.initialValues.description,
            rating: props.initialValues.rating
        }
    }

    handleFieldChange = ({ target }) => {
            this.setState(state => ({
                ...state,
                [target.name]: target.value
            })
        );
    }

    handleCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    handleSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    }

    isSubmitAllowed() {
        return this.state.title && this.state.description && this.state.rating;
    }

    handleRate = (e, { rating }) => {
        this.setState({ rating: rating });
    }

    render() {
        const { disabled, submitButtonTitle, submitButtonIcon, cancelButtonTitle, cancelButtonIcon, title: formTitle } = this.props;
        const { title, description, rating } = this.state;

        return (<Segment.Group raised>
                <Header block attached="top" as="h3">
                    {formTitle}
                </Header>
                <Segment attached>
                    <Image centered src={dish} size="small" />
                    <Form>
                        <Form.Input
                            label="Title"
                            name="title"
                            value={title}
                            autoComplete="off"
                            placeholder="Some fancy title"
                            onChange={this.handleFieldChange}
                            disabled={disabled}
                        />
                        <Form.TextArea
                            label="Descripsion"
                            name="description"
                            value={description}
                            placeholder="Detailed description"
                            onChange={this.handleFieldChange}
                            disabled={disabled}
                        />
                    </Form>
                        <Rating 
                        icon='star'
                        maxRating={5} 
                        defaultRating={this.state.rating}
                        value={rating}
                        onRate={this.handleRate}
                        />
                </Segment>
                <Segment attached textAlign="right">
                    <Button icon={cancelButtonIcon} content={cancelButtonTitle} onClick={this.handleCancel} />
                    <Button icon={submitButtonIcon} color="green" content={submitButtonTitle} onClick={this.handleSubmit} disabled={!this.isSubmitAllowed()} loading={disabled} />
                </Segment>
            </Segment.Group>)
    }

}

RecipeForm.defaultProps = {
    initialValues: {
        title: '',
        descripsion: ''
    }
};

RecipeForm.PropTypes ={
    disabled: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    submitButtonIcon: PropTypes.string.isRequired,
    cancelButtonTitle: PropTypes.string.isRequired,
    cancelButtonIcon: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        title: PropTypes.string,
        descripsion: PropTypes.string,
        rating: PropTypes.number
    })
};