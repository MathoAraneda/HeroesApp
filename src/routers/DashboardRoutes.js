import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import  NavBar  from '../components/ui/NavBar';
import { HeroeScreen } from '../components/heroes/HeroeScreen';
import { DcScreen } from '../components/dc/DcScreen';
import { SearchScreen } from '../components/search/SearchScreen';

export const DashboardRoutes = () => {

    return (
        <>
            <NavBar />
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/marvel" component={ MarvelScreen}></Route>
                    <Route exact path="/hero/:heroeId" component={ HeroeScreen }></Route>
                    <Route exact path="/dc" component={DcScreen}></Route>
                    <Route exact path="/search" component={SearchScreen}></Route>
                    <Redirect to="marvel" />
                </Switch>
            </div>
        </>
    )
}
