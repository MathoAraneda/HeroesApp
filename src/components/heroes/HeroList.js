import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from '../heroes/HeroCard'; 

export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [ publisher ]);
    //const heroes = getHeroesByPublisher(publisher);

    return (
            <div className="card animate__animated animate__fadeIn">
                <div className="card-body">
                {
                    heroes.map( hero => (
                        <HeroCard key={hero.id }
                            { ...hero }>
                        </HeroCard>
                    ))
                }

                </div>
            </div>  
    )
}
