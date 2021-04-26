import React from 'react'
import styled, {keyframes} from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const DivLoading = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;

    & svg {
        animation: ${rotate} 2s linear infinite;
    }
`;

const Loading = () => {
    return(
        <DivLoading>
            <FontAwesomeIcon icon={faSnowflake} />
        </DivLoading>
    )
}

export default Loading