import React from 'react';
import { shallow, mount } from 'enzyme';
import { HeroeScreen } from '../../../components/heroes/HeroeScreen';
import { MemoryRouter, Route } from 'react-router';

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    test('Debe de mostrarse correctamente si no hay argumentos en el URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroeScreen history={ history }/>
            </MemoryRouter>
            
        );

        //expect( wrapper).toMatchSnapshot();
        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('Debe mostrar un hero si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroeScreen }/>
            </MemoryRouter>  
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
    });
    
    test('Debe de regresar a la pantalla anterior con PUSH', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroeScreen history={ history } /> }/>
            </MemoryRouter> 
        )

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalledWith(); 
    });

    test('Debe de regresar a la pantalla anterior GOBACK', () => {
        

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroeScreen history={ history } /> }/>
            </MemoryRouter> 
        )

        wrapper.find('button').prop('onClick')();

        //No se ha llamado ninguna vez
        expect( history.push ).toHaveBeenCalledTimes(0);
        expect( history.goBack ).toHaveBeenCalledWith(); 
    });

    test('Debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider1222121']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroeScreen history={ history } /> }/>
            </MemoryRouter> 
        )
        
        expect( wrapper.text() ).toBe('');
    })
    
    
    
    
})
