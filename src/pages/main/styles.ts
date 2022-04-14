import styled from 'styled-components'

export const Container = styled.div`
    
    padding: 2rem;
    display: grid;
    gap: 2rem;
    
    .list {
        display: grid;
        justify-content: center;
        text-align: center;
        align-items: center;
        grid-template-columns: repeat(auto-fit, minmax(200px, .25fr));
        gap: 3rem;
    }

    .button {
        justify-content: center;
        text-align: center;
        align-items: center;

        button {
            font-size: 1rem;
            text-transform: uppercase;
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            color: #ffffff;
            background: #6933ff;
            border: 0;
            padding: 0 2rem;
            border-radius: 0.25rem;
            height: 3rem;

            transition: filter 0.2s;

            &:hover {
                filter: brightness(0.9)
            }            
        }
    }

    .logo-searchbar {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: space-around;

        .searchbar {
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            gap: 2rem;
            
            input {
                padding: 0 1.5rem;
                height: 2rem;
                border-radius: 0.25rem;

                border: 1px solid #d7d7d7;
                background: #e7e9ee;

                font-weight: 400;
                font-size: 1rem;

                &::placeholder {
                    color: #969cb3;
                }
            }

            button {
                padding: 0 1.5rem;
                height: 2rem;

                background: #6933ff;
                color: #fff;
                border-radius: 0.25rem;
                border: 0;

                font-size: 1rem;
                font-weight: 600;

                transition: filter 0.2s;

                &:hover {
                    filter: brightness(0.9);
                }
            }
        }
    }
`;