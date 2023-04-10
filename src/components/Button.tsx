import styled from 'styled-components';

const Button = styled.button`
margin: 0px;
border-radius: 0.5rem;
padding: 0.5rem 1rem;
font-weight: 700;
border: 1px solid rgb(255, 152, 0);
background: transparent;
color: white;
transition: all 0.1s ease 0s;
:hover {
    background: rgb(255, 152, 0);
    color: black;

}
cursor: pointer;
`;

export default Button;