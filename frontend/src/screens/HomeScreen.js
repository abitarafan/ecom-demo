import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonGroup, Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, sortProductsAZ, sortProductsZA, sortProductsHL, sortProductsLH } from '../actions/productActions'


function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList
    
    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])



    return (
        <div>
            
            {!keyword }

            <>
            <ButtonGroup className="mr-2" size="sm">
                <Button
                variant="outline-danger"
                onClick={()=>dispatch(sortProductsAZ(products))}
                >
                   ABC
                </Button>
                <Button
                variant="outline-danger"
                onClick={()=>dispatch(sortProductsZA(products))}
               >
                   ZXY
               </Button>
               <Button
                variant="outline-danger"
                onClick={()=>dispatch(sortProductsHL(products))}
               >
                   Cheapest
               </Button>

               <Button
                variant="outline-danger"
                onClick={()=>dispatch(sortProductsLH(products))}
               >
                   Most Expensive
               </Button>
            </ButtonGroup>
            </>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>
            }
        </div>
    )
}

export default HomeScreen
