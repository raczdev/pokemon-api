import { useState } from "react"
import { Container, ModalContainer, Pokemons } from "./styles"
import Modal from 'react-modal'
import closeImg from "../../assets/close.svg";

interface ListProps {
    key: number,
    name: string,
    id: number,
    abilities?: {
        ability: {
            name: string,
        }
    }[] | undefined;
    image: string,
    types?: {
        type: {
            name: string,
        }
    }[] | undefined;
}

export const List: React.FC<ListProps> = (props) => {

    const { image, name, abilities, types } = props

    const [isOpen, setIsOpen] = useState(false)
    Modal.setAppElement("#root");

    const handleOpenModal = () => {
        setIsOpen(true)
    }
    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <Container>
            
            <Pokemons onClick={handleOpenModal} key={name}>
                <div className="img-name" >
                    <img src={image} alt={name} />
                    <h2>{name}</h2>
                </div>
            </Pokemons>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={handleCloseModal}
                        overlayClassName="react-modal-overlay"
                        className="react-modal-content"
                    >
                        <ModalContainer>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="react-modal-close"
                            >
                                <img src={closeImg} alt="Fechar modal" />
                            </button>
                            <div className="modal-content">
                                <div className="img-name-modal" >
                                    <img src={image} alt={name} />
                                    <h2>{name}</h2>
                                </div>
                                <div className="abilities">
                                    <h3>Abilities:</h3>
                                    {abilities?.map((ability) => {
                                        return (
                                            <p key={ability.ability.name}>
                                                {ability.ability.name}
                                            </p>
                                        )
                                    })}
                                </div>
                                <div className="types">
                                    <h3>Type(s):</h3>
                                    {types?.map((type) => {
                                        return (
                                            <p key={type.type.name}>
                                                {type.type.name}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </ModalContainer>
                        
                    </Modal>
        </Container>
        
        
    )
}