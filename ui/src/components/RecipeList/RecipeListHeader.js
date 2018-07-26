import React from 'react';
import { Button, Container, Statistic} from 'semantic-ui-react';

export default ({ onCreate, onChange, listLength }) => (
    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Statistic size="mini">
            <Statistic.Value>{listLength}</Statistic.Value>
            <Statistic.Label>{listLength === 1 ? 'recipe' : 'recipes'}</Statistic.Label>
        </Statistic>
        <div class="ui icon input">
            <input type="text" placeholder="Search..."
                onChange={e => onChange && onChange(e.target.value)}
            />
            <i class="inverted circular search link icon"></i>
        </div>  
        <Button 
            icon="plus" 
            content="Add recipe" 
            color="green" 
            onClick={() => onCreate && onCreate()}
        >
        </Button>
    </Container>
)