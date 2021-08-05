import React, { useMemo } from 'react'

import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    console.log(location.search)
    //const { q = '' } = queryString.parse( location.search )

    const [formValues, handleInputChange ] = useForm({
        searchText: ''
    });

    const { searchText } = formValues;
    const heroesFiltered =  useMemo(() => getHeroByName(searchText), [searchText]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?1=${ searchText }`);
    }
    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>

                </div>

                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    {
                     (searchText ==='') 
                        &&
                        <div className="alert alert-info">
                            Search a hero
                        </div> 
                    }

                    {   
                        (searchText !=='' && heroesFiltered.length === 0)
                            &&
                        <div className="alert alert-danger">
                            Search a hero
                        </div>
                    }
                    
                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
