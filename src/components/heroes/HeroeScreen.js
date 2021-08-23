import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

//Para trabajar con imagenes dinamicas
//const heroImages = require.context('../../assets/heroes', true);
//import heroImages from '../../assets/heroes/';

export const HeroeScreen = ( {  history } ) => {
    const { heroeId } = useParams();

    const hero = useMemo(() => getHeroById(heroeId), [heroeId]);
    //const hero = getHeroById(heroeId);

    if( !hero){
        return <Redirect to="/" />;
    }

    const handleReturn = () => {
        if(history.length <= 2){
            history.push('/');
        }else{
            history.goBack();
        }
        
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    //src={ `../assets/heroes/${ heroeId }.jpg` }
                    //src={heroImages + heroeId.toString() + ".jpg"}
                    src={heroImages(`./${ heroeId }.jpg`).default}
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeInLeft">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b> { alter_ego }</li>
                    <li className="list-group-item"><b>Publisher: </b> { publisher }</li>
                    <li className="list-group-item"><b>First appearance: </b> { first_appearance }</li>
                </ul>

                <h5> Characteres </h5>
                <p> { characters } </p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn}
                >
                    Return
                </button>
            </div>
            
        </div>
    )
}
