import React, { useEffect, useState } from 'react'
import {createApi} from 'unsplash-js'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

const unsplash = createApi({
    accessKey: "xhJULoh15VNlSLXbPSdP0k0JfaYftiKI-BbkldrWXc8"
  })

const Body = styled.div`
    width: 100%;
    height: 100vh;
    background: url(${props => props.url ? props.url.urls.full : null}) no-repeat;
    background-size: cover;
`;

const Credit = styled.a`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.8rem;
    text-decoration: none;
    color: black;
    background-color: rgba(171, 183, 183, 0.6);
    padding: 5px;
    border-radius: 4px;

    & svg {
        margin-right: 5px;
    }

    &:hover {
        color: rgba(171, 183, 183, 1);
        background-color: black;
    }
`;


const ids = [
    {
        icons: ['13d', '13n'],
        desktop: ['IWenq-4JHqo', 'kFHz9Xh3PPU', 'nhaj0qIxrIs', 'ytYc8VkMVL0', '4G-FPjCh21Q'],
        mobile: ['jd_YFWRkOqQ', '8wZPSrX4vLg', 'IszWg_PhEGo', 'H3FBy3i9Q7E', 'GwGd5YpGlJk']
    },
    {
        icons: ['03d', '04d', '03n', '04n'],
        desktop: ['urYKXcZdKzc', 'EDPA3Aq6kCs', 'J-LMPtk8tmg', 'EiGCgdLd_C8', 'Q30KtoAPzYc'],
        mobile: ['0Mb_jRfu8cM', 'ZuK5cBX1qlw', 'n4PSXU-dCTQ', 'MnnXMvs4cQo', 'A7ol2HfnycY']
    },
    {
        icons: ['11d', '11n'],
        desktop: ['2QUvkQTBh5s', '2cDIzRnVq0Q', 'LHdST1-f2bc', 'Cm5zI68Wdew', 'HxKgk_MpHMM'],
        mobile: ['uu-Jw5SunYI', '___Lnn9HGko', '9nIAbs3tAY8', 'in9-n0JwgZ0', '3qucB7U2l7I']
    },
    {
        icons: ['09d', '10d', '09n', '10n'],
        desktop: ['YfveMgXSWkc', '4DsowKunk84', '8yt8kBuEqok', '_87lZuOyg64', '3OOvRhgmj6A'],
        mobile: ['1YHXFeOYpN0', 'nwxK2Znr-is', 'FobwhDUgdrk', 'g8Sq1d9Lm98', 've-R7PCjJDk']
    },
    {
        icons: ['01d', '02d'],
        desktop: ['ramIV46b_Tg', 'HClKQKUodF4', 'K1HH-rCUthY', 'bT-0vySMsls', 'u7ldh_tgH3s'],
        mobile: ['Qar7V-mBZvQ', 'q9cKxjE3VgU', 'm82uh_vamhg', 'd9-RJ03r9Sw', 'HLBube4EwPA']
    },
    {
        icons: ['01n', '02n'],
        desktop: ['S2gPnFZRvps', 'JnHBi5TEP1c', 'dvb9r2_C-sU', 'uD2a9J41CuI', 'vhInzGLpnyI'],
        mobile: ['sq65s0uxGQE', 'zBveIYpwv64', 'sCFxdZTlsFY', 'ECbWyWXbC6I', 'XE2RmuV6ed0']
    },
    {
        icons: ['50d', '50n'],
        desktop: ['-DKUThtgWI0', 'jWD3o-Ht8ZA', 'KtnNZp-uc9A', 'y00l2nM4hc8', 'J_h6ez1ufyY'],
        mobile: ['7CME6Wlgrdk', 'S4QJqcBXDMc', 'jdM9HbkPhsA', 'yY66QAbGxq4', 'YmsrXcDf0J8']
    }
]

const Home = ({clima, isDesktop}) => {

    const [data, setPhotosResponse] = useState(null);
    console.log(clima)

    useEffect(() => {

        let arrOfIds= ids.filter((a)=> a.icons.includes(clima.weather[0].icon))
        let listOfPhotos
        if (isDesktop) {
            listOfPhotos = arrOfIds[0].desktop
        } else {
            listOfPhotos = arrOfIds[0].mobile
        }
        let aleatorio = Math.floor(Math.random() * listOfPhotos.length)
        console.log(listOfPhotos[aleatorio])

      unsplash
    //   getRandom trae resultados DEMASIADO randoms, no le importan para nada mis filtros :[
    //   .photos.getRandom({ query: `${clima.weather[0].main} ${clima.main.temp < 10 ? 'winter' : 'summer'} ${clima.weather[0].description}`, orientation: "landscape", count: 1 })
       .photos.get({photoId: `${listOfPhotos[aleatorio]}`}) 
        .then(result => {
          setPhotosResponse(result);
          console.log(result)
        })
        .catch((err) => {
          console.log(err + "something went wrong!");
        });
    }, []);

    console.log(data)
    
  if (data === null) {
    return <div></div>
  } else if (data.errors) {
    return (
      <div></div>
    )
  } else {

    return(
        <Body url={data.response}>
            <Credit
                target="_blank"
                rel='noreferrer'
                href={`https://unsplash.com/@${data.response.user.username}`}
            ><FontAwesomeIcon icon={faCameraRetro} />   {data.response.user.name}
            </Credit>
        </Body>
    )}
}

export default Home