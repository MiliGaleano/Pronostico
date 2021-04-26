import React from 'react'
import styled from 'styled-components'

const responsive = '@media (min-width: 800px)'

const DivSearch = styled.div`
    position: absolute;
    top: calc(20vh + 300px);
    width: 70%;
    left: 15%;
    height: 40px;
    background-color: rgba(171, 183, 183, 0.6);
    border-radius: 0px 0px 12px 12px;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.6);
    z-index: 1;

    ${responsive} {
        top: calc(20vh + 200px);
        width: 600px;
        left: calc((100% - 600px)/2);
        height: 50px;
    }
`;

const Form = styled.form`
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & input{
    width: 80%;
    height: 50%;
    border-radius: 8px;
    border-width: 0;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: center;
    }
    & input:focus{
        border: none;
        outline: none;
    }
`;

const SearchComponent = ({setSearch, handleNewCity, placeholder}) => {

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleNewCity()
    }

    return(
        <DivSearch>
            <Form onSubmit={handleSubmit}>
                <input placeholder={placeholder} onChange={handleChange}></input>
            </Form>
        </DivSearch>
    )
}

export default SearchComponent