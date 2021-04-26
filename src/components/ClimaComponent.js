import React from 'react'
import styled from 'styled-components'

const responsive = '@media (min-width: 800px)'

const DivClima = styled.div`
    position: absolute;
    top: 20vh;
    width: 90%;
    left: 5%;
    height: 300px;
    background-color: rgba(171, 183, 183, 0.6);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.6);
    z-index: 2;

    & section {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-evenly;
        align-items: center;
    }

    ${responsive} {
        width: 800px;
        left: calc((100% - 800px)/2);
        height: 200px;

        & section {
            flex-direction: row;
        }
    }
`;

const DivHoy = styled.div`
    width: 100%;
    color: black;
    display: flex;
    flex-direction: column;

    ${responsive} {
        width: 50%;
    }
`;

const City = styled.h1`
    font-weight: 800;
    text-align: center;
    font-size: 1.3rem;

    ${responsive} {
        font-size: 2rem;
    }
`;

const DivDatosHoy = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 86px;
    justify-content: space-evenly;
    align-items: center;

    ${responsive} {
        height: 116px;
    }
`;

const Temperatura = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(171, 183, 183, 1);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
    border-radius: 12px;

    & h2 {
    font-weight: 500;
    text-align: center;
    font-size: 0.7rem;
    margin-bottom: 5px;
    }

    ${responsive} {
        width: 110px;
        height: 110px;

        & h2 {
            font-size: 0.8rem;
        }
    }
`;

const Icon = styled.img`
    width: 100%;
`;

const MinMax = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 5px;

    & p{
        font-weight: 500;
        text-align: left;
        font-size: 0.7rem;
    }

    & h2 {
        font-weight: 800;
        font-size: 1rem;
        text-align: center;
        margin-bottom: 5px;
    }

    ${responsive} {
        & p {font-size: 0.8rem;}
        & h2 {font-size: 1.2rem;}
    }
`;

const DivExtendido = styled(DivHoy)`
    width: 90%;
    align-items: center;
    margin-top: 1rem;

    & p{
        font-weight: 500;
        text-align: center;
        font-size: 0.8rem;
    }

    ${responsive} {
        width: 40%;
        margin-top: 0;
    }
`;

const DivDatosExt = styled(DivDatosHoy)`
    height: 80px;
`;

const Dias = styled(Temperatura)`
    width: 60px;
    height: 60px;
    cursor: pointer;

    & img{
        width: 100%;
        
    }

    &:hover img{
        display: none;
    }
    &:hover h1 {
        display:flex;
    }
`;

const DiasTemp = styled(City)`
    display: none;
    font-size: 1.4rem;
`;

const DiasExtendido = styled(DivDatosExt)`
    height: 16px;

    & p{
        width: 60px;
    }
`;

const ClimaComponent = ({clima, extended}) => {
    const extendido = extended.list.filter((a) => a.dt_txt.includes('18:00:00'))
    extendido.length= 4
    let fechas = []
    for (let i=0; i<extendido.length; i++){
        let fecha = extendido[i].dt_txt.split(' ')[0].split('-')
        let arr = [fecha[2], fecha[1]]
        fechas.push(arr.join('/'))
    }
    return(
        <DivClima>
            <section><City>{clima.name}</City></section>
            <section>
                <DivHoy>
                    <DivDatosHoy>
                        <Temperatura>
                            <h2>Temperatura</h2>
                            <City>{clima.main.temp.toFixed(0)}°</City>
                        </Temperatura>
                        <Temperatura>
                            <Icon src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt={clima.weather[0].description}></Icon>
                        </Temperatura>
                        <MinMax>
                            <p>Mínima</p>
                            <h2>{clima.main.temp_min.toFixed(0)}°</h2>
                            <p>Máxima</p>
                            <h2>{clima.main.temp_max.toFixed(0)}°</h2>
                        </MinMax>
                    </DivDatosHoy>
                </DivHoy>
                <DivExtendido>
                    <p>Pronóstico extendido</p>
                    <DivDatosExt>
                        {extendido.map(dia =>
                            <Dias>
                                <img src={`http://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`} alt={dia.weather[0].description} ></img>
                                <DiasTemp>{dia.main.temp.toFixed(0)}°</DiasTemp>
                            </Dias>
                        )}
                    </DivDatosExt>
                    <DiasExtendido>
                        {fechas.map(fecha =>
                            <p>{fecha}</p>
                        )}
                    </DiasExtendido>
                </DivExtendido>
            </section>
        </DivClima>
    )
}

export default ClimaComponent