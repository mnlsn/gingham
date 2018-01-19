import React from 'react';
import Heading from './../../fibers/headings/Headings';

const Header = ({text, links}) => {
    const mappedLinks = links.map((link) => {
        return (
            <li>link.text</li>
        )
    });

    return (
        <header>
            <Heading>{text}</Heading>
            <ul>
                {mappedLinks}
            </ul>
        </header>
    )
}

export default Header;
