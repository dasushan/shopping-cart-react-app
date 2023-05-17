//Buy Section of Page
import React, {useState, useEffect} from "react"
import  Axios  from "axios"
import CartItem from "./CartItem"

import {faker} from "@faker-js/faker"
import {Container, Col, Row} from "reactstrap"


const apiKey = "vMyxREH0dnt8BBBqjS9Sn0mwzCbRKjNlZw6mE3iyNT3AAwwMQSvZPOlq"

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"
//const localurl = "https://www.myjsons.com/v/e5e61083"


const BuyPage = ({addInCart}) => {

    const [product, setProduct] = useState([])

    // const fetchPhotos = async () => {
    //     const response = await Axios.get(url, {
    //         header : {
    //             Authorization: apiKey
    //         }
    //     });
    // };

    const fetchPhotos = async () => {
        const {data} = await Axios.get(url , {
            headers: {
                Authorization: apiKey
              }
        });
    
    const {photos} = data;

    const allProducts = photos.map(photo =>({
        smallImage: photo.src.medium,
        tinyImage: photo.src.tiny,
        productName: faker.random.word(),
        productPrice: faker.commerce.price(),
        id: faker.random.numeric(5)
    }))

    setProduct(allProducts);

    };
    useEffect(() => {
        fetchPhotos()
    } , []);

    return(
        <Container fluid>
            <h1 className="text-success text-center">
                Buy Page
            </h1>
            <Row>
                {product.map(product =>(
                    <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    )

};

export default BuyPage

