import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Component } from "react";
import { Badge } from "reactstrap";
import { BsCart } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { PiShoppingCartLight } from 'react-icons/pi';
import { PiShoppingCartFill } from 'react-icons/pi';
import { Table } from "reactstrap";
import "../src/Navi.css";

export default class Navi extends Component {

    state = {
        toplam: 0,
    }

    componentDidUpdate(prevProps) {
        // props.cart değiştiğinde çalışması gereken bir koşul ekleyin
        if (this.props.cart !== prevProps.cart) {
            // toplamı hesaplamak için reduce kullanın
            const total = this.props.cart.reduce((acc, crt) => {
                return acc + crt.quantity * crt.product.unitPrice;
            }, 0);

            // setState'i bu toplam değeriyle çağırın
            this.setState({ toplam: total });
        }
    }

    renderHead() {
        return (
            <div>
                <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "70px", background: "gold" }}><BsCart className="m-2" /> Alışveriş Sepetim</h3>
            </div>
        )
    }

    renderCart() {
        return (
            <div>
                <Table style={{ width: "600px", textAlign: "center" }}>
                    <thead>
                        <tr className='trth'>
                            <th>Adet</th>
                            <th>Ürün</th>
                            <th>Ürün İsmi</th>
                            <th>A*F</th>
                            <th>Kaldır</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cart.map(cartItem => (
                                <tr key={cartItem.product.id} className='tby'>
                                    <td> <Badge color="success" style={{ marginRight: "5px", textAlign: "center" }}>{cartItem.quantity}</Badge> </td>
                                    <td>
                                        <img
                                            style={{ width: "45px", height: "45px" }}
                                            alt="Sample"
                                            src="https://picsum.photos/200/350"
                                        /></td>
                                    <td>{cartItem.product.productName}</td>
                                    <td style={{ color: "green" }}>{cartItem.quantity * cartItem.product.unitPrice}</td>
                                    <td className='dng' onClick={() => this.props.getOnRemoveButton(cartItem.product)}><GrClose /></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
                <div className='d-flex justify-content-between' style={{ background: "gold" }}>
                    <div>
                        <h4 style={{ border: "none", marginLeft: "5rem" }}>TOPLAM</h4>
                    </div>
                    <div style={{ marginRight: "5rem" }}>
                        <h4 style={{ border: "none", color: "green" }} >{this.state.toplam}</h4>
                    </div>
                </div>
            </div>
        )
    }

    renderEmptyCart() {
        return (
            <div style={{ backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center", width: "600px", height: "70px" }}>
                <h3>Sepet Boş</h3>
            </div>
        )
    }

    render() {

        return (
            <Nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", marginTop: "25px" }}>
                <div>
                    <Nav.Link>
                        <div className="banner">
                            GeldiGidiyor
                        </div>
                    </Nav.Link>
                </div>

                <div style={{ width: "70%" }}>
                    <InputGroup>
                        <Form.Control className='fcl' placeholder={this.props.currentCategory.length > 0 ? this.props.currentCategory : "Teknoloji,Ev Aletleri,Sağlıklı Yaşam ve daha fazlası..."} aria-label="Text input with dropdown button" />
                    </InputGroup>
                </div>

                <div>
                    <div className='col-2'>
                        <DropdownButton
                            variant="outline-secondary"
                            title={<Dropdown.Item href="#">{this.props.cart.length > 0 ? <PiShoppingCartFill /> : <PiShoppingCartLight />}
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {this.props.cart.length}
                                </span></Dropdown.Item>}
                            id="input-group-dropdown-2"
                            align="end"
                        >
                            {this.renderHead()}
                            {this.props.cart.length > 0 ? this.renderCart() : this.renderEmptyCart()}
                        </DropdownButton>
                    </div>
                </div>
            </Nav>
        );
    }

}


