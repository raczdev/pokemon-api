import styled from "styled-components";

export const Container = styled.div`
    
`;

export const Pokemons = styled.div`
    background-color: #ffffff;
    border: 2px solid #969cb3;
    border-radius: 1rem;
    padding: 2rem;

    cursor: pointer;

    transition: transform 0.2s ease-in;

    &:hover {
        transform: scale(1.05);
    }

    .img-name {
        h2 {
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #363f5f;
            letter-spacing: 0.2rem;
        }
    }

`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .modal-content {

        display: grid;
        gap: 2rem;

        .img-name-modal {
            img {
                width: 10rem;
            }
            h2 {
                font-size: 1.75rem;
                letter-spacing: 0.2rem;
                font-weight: 700;
                color: #363f5f;
            }
        }

        .abilities {

            display: flex;
            align-items: center;

            h3 {
                color: #363f5f;
                font-size: 1rem;
                font-weight: 400;
                margin-right: .5rem;
            }
            p {
                color: #969cb3;
                font-size: 1rem;
                font-family: 'Poppins', sans-serif;

                & + p {
                    margin-left: .5rem;
                }
            }
        }

        .types {
            display: flex;
            align-items: center;

            h3 {
                color: #363f5f;
                font-size: 1rem;
                font-weight: 400;
                margin-right: .5rem;
            }

            p {
                color: #969cb3;
                font-size: 1rem;
                font-family: 'Poppins', sans-serif;

                & + p {
                    margin-left: .5rem;
                }
            }
        }
    }

    
`;