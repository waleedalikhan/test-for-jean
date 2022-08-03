import React, { FC } from 'react';

type Props = {
    name?: string;
};

export const Hello: FC<Props> = ({ name }) => {
    return (
        <div>
            <h1 className='bg-green-400 text-white'>Hello {name}</h1>
        </div>
    );
};