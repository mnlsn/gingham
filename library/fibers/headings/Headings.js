import React from 'react';

const h1 = ({children}) => {
    return <h1>{children}</h1>
}

const h2 = ({children}) => {
    return <h2>{children}</h2>
}

const h3 = ({children}) => {
    return <h3>{children}</h3>
}

const h4 = ({children}) => {
    return <h4>{children}</h4>
}

const h5 = ({children}) => {
    return <h5>{children}</h5>
}

const h6 = ({children}) => {
    return <h6>{children}</h6>
}

const h = {
    1: h1,
    2: h2,
    3: h3,
    4: h4,
    5: h5,
    6: h6
}

const getHeading = (level) => {
    return h[level]
}

const Heading = ({level, children}) => {
    const HLevel = h[level];
    return (
        <HLevel>{children}</HLevel>
    )
}


export default Heading;
