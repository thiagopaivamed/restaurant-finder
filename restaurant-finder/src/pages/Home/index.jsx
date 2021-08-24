import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Search, Logo, Wrapper, CarouselTitle, Carousel, ModalTitle, ModalContent } from './styles';
import TextField, { Input } from '@material/react-text-field'
import MaterialIcon from '@material/react-material-icon';

import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from '../../components';
import logo from '../../assets/logo.svg'
import restaurante from '../../assets/restaurante-fake.png';


const Home = () => {
    const [InputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setQuery(InputValue);
        }
    }

    function handleOpenModal(placeId) {
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt="logo restaurante" />
                    <TextField label="Pesquisar" outlined trailingIcon={<MaterialIcon role="button" icon="search" />}>
                        <Input value={InputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) =>
                                    <Card key={restaurant.place_id} photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} title={restaurant.name} />)}

                            </Carousel>
                        </>
                    ) : (
                        <Loader />
                    )}

                </Search>
                {restaurants.map((restaurant) =>
                    <RestaurantCard restaurant={restaurant} onClick={() => handleOpenModal(restaurant.place_id)} />
                )}

            </Container>
            <Map query={query} placeId={placeId} />
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)} >
                {restaurantSelected ? (
                    <>
                        <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                        <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                        <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto agora' : 'Fechado'}</ModalContent>
                    </>
                ) : (
                    <>
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                        <Skeleton width="10px" height="10px" />
                    </>
                )}

            </Modal>
        </Wrapper>

    );
}

export default Home;