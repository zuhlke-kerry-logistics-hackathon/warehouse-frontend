import React from 'react';
import Position from './Position';
import PropTypes from 'prop-types';


const Level = props => {

    const generatedPositions = props.posList.map((pos) => {
        return <Position key={pos} bottomRow={props.bottomRow} value={pos} />;
    });

    return(
        <div className='level'>
            {generatedPositions}
        </div>
    );
};

Level.propTypes = {
    bottomRow: PropTypes.bool,
    maxPositions: PropTypes.string,
    posList: PropTypes.array
};

export default Level;