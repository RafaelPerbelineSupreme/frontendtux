/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
 // eslint-disable-next-line
import PropTypes from 'prop-types';
 // eslint-disable-next-line
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
 // eslint-disable-next-line
import { MDBBtn, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
// reactstrap components
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faWaveSquare, faSignal, faLock, faTv, faLaptop, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import './Header.css';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import SpinnerJs from './Spinner';
import Alert from '@material-ui/lab/Alert';
import ModalMaps from './ModalMaps';

const api = {
    baseUrl: `http://127.0.0.1:8000/api/group/`,
    usuario: 'http://127.0.0.1:8000/api/user/',
    urlToken: `http://127.0.0.1:8000/api/auth/`
};

const ModalA = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
   // eslint-disable-next-line
  const [title, setTitle] = React.useState("Transitioning...");

   const onClick = (event) => {
      showModal();
   }

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    //setTitle("Transitioning...");
  };

  const modalLoaded = () => {
    setTitle("Modal Ready");
  };

  return (
    <>
      <MDBBtnGroup style={{'justifyContent': 'center', 'padding': '5px'}}>
         <Alert variant="filled" severity="info">
        <strong><span type="submit" onClick={onClick}>Teste do modal</span></strong>
        </Alert>
      </MDBBtnGroup>
      <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
        <Modal.Header style={{background: '#2196f3'}} >
          <Modal.Title style={{
                marginTop: 0,
                marginLeft: '18%',
        }}>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
      </Modal>
    </>
  );
};

class Header extends React.Component {
      /* Primeira letra de uma string maiuscula */
      capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

      constructor(props) {
        super(props);
        this.state = {
            grupos: [],
            isShowing: false,
            password: '',
            type: 'password',
            idUsuarioLogado: ''
        };
      this.showHide = this.showHide.bind(this);
      this.fetchGrupos = this.fetchGrupos.bind(this);
      this.fetchGrupos();
    }

    handleChange = (event) => {
        let password = event.target.value;
        this.setState({
            password: password
        })
    }

 showHide(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }
    fetchGrupos = () => {
        axios.get(
        api.baseUrl, { headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            "Authorization" : `Token ${this.props.cookies.get('token')}`}
        }
      ).then((res) => {
        this.setState({grupos: res.data})
      });
    }

componentDidMount(){
        axios.get(
        api.usuario, { headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            "Authorization" : `Token ${this.props.cookies.get('token')}`}
        }
      ).then((res) => {
        this.setState({idUsuarioLogado: res.data.id})
      });
}
entrarGrupo = (e) => {
    let dadosGrupo = e.target.value + "," + this.state.idUsuarioLogado;
    dadosGrupo = dadosGrupo.split(',');
    //var json = JSON.stringify(dadosGrupo)
    //console.log(json[0])
    axios.put(
        api.baseUrl, {
            'username': [1, 2, 2, 5],
            'descricao': 'Grupo Tux'

        }, { headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            "Authorization" : `Token ${this.props.cookies.get('token')}`}
        }
      ).then((res) => {
        console.log("teste")
        console.log(res)
      });
}


  render() {
   // eslint-disable-next-line
   const { loading } = this.state;
    console.log(this.props.cookies.get('token'))
   if(this.props.cookies.get('token') === null || this.props.cookies.get('token') === 'undefined'){
        window.location.replace("/auth/login");
        this.warning()
      }else{
        return (
    <React.Fragment>
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <div style={{color: 'white',textAlign: 'center', fontSize: '60px', padding: '50px'}}><strong>FRONTEND GRUPO TUX</strong></div>
              {/* Card stats */}
              <MDBBtn style={{
                    'cursor': 'pointer',
                    'bottom': '18px',
                    'height': '45x',
                    'background': '#2196f3',
                    'color': 'white',
                    'borderRadius': '10px',
                    'borderColor': '#2196f3',
                    'border': '1px solid #2196f3',
                    'fontWeight': '700',
                    'fontSize': '.8em',
              }} type="submit" value='{}' >Adicionar</MDBBtn>
              <Row>{this.state.grupos.map((w, index)=>
                    <Col lg="6" xl="3">
                     <button variant="contained" onClick={this.entrarGrupo} value={w.descricao + "," + w.username}>Entrar no grupo</button>
                     <Alert variant="filled" severity="info">
                    <strong>{w.descricao}</strong>
                    </Alert>
                   <Card className="card-stats mb-xl-5">
                    <CardBody style={{color: 'black',marginTop: '-25px', whiteSpace: 'pre-line'}}>
                            <p>  < br />
                                <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: 15}}>Usuários do grupo:
                                <br/>
                                {w.get_parents.toString().split(",").join('\n')}
                                </span> < br />

                                <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: 15}}></span>< br />

                            </p>
                            <ModalA title={
                                <Alert variant="filled" severity="info">
                                <strong><span>Modal Teste</span></strong>
                                </Alert>
                            }
                            body={
                                <> <Card className="card-stats mb-xl-5">
                                    <p style={{color: 'black', marginLeft: '20px', marginRight: '20px', marginTop: '20px'}}>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '15px'}}>Nome: </span> < br/>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '15px'}}>Nome: </span> < br/>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '15px'}}>Nome: </span> < br/>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '15px'}}>Nome: </span> < br/>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '20px'}}>Nome: </span> < br/>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '15px'}}>Nome: </span> < br/>
                                    <FontAwesomeIcon icon={faUserFriends} /><span style={{marginLeft: '15px'}}>Nome: </span> < br/>
                                        <hr />
                                        <label htmlFor='body'>Teste</label><br />
                                          <input type={this.state.type} id="password__input" name="password__input" className="password__input" onChange={this.handleChange} />
                                          <span style={{
                                                'cursor': 'pointer',
                                                'position': 'absolute',
                                                'bottom': '18px',
                                                'height': '28px',
                                                'background': '#2196f3',
                                                'color': 'white',
                                                'marginLeft': '10px',
                                                'padding': '4px 8px',
                                                'borderRadius': '4px',
                                                'fontWeight': '700',
                                                'fontSize': '.8em',
                                          }} className="password__show" onClick={this.showHide}>{this.state.type === 'input' ? 'Esconder' : 'Mostrar'}</span>
                                    </p>
                                    </Card>
                                    <div style={{
                                            marginTop: '-20px',
                                        }}>

                                    <SpinnerJs title="Botão 1" password={this.state.password} api="http://localhost:8000/api/senhawpa2/" style={
                                        {
                                                'cursor': 'pointer',
                                                'background': '#2196f3',
                                                'color': 'white',
                                                'borderRadius': '5px',
                                                'fontWeight': '700',
                                                'fontSize': '.8em',
                                                'borderColor': '#2196f3',
                                                'border': '5px solid #2196f3',
                                                'marginLeft': '10px',
                                        }
                                    }/>
                                    <SpinnerJs title="Botão 2" api="http://localhost:8000/api/wifiphishing/" style={
                                        {
                                                'cursor': 'pointer',
                                                'background': '#2196f3',
                                                'color': 'white',
                                                'borderRadius': '5px',
                                                'fontWeight': '700',
                                                'fontSize': '.8em',
                                                'borderColor': '#2196f3',
                                                'border': '5px solid #2196f3',
                                                'marginTop': '10px',
                                                'marginLeft': '10px'
                                        }
                                    }/>
                                    <ModalMaps style={{
                                        'cursor': 'pointer',
                                        'background': '#2196f3',
                                        'color': 'white',
                                        'borderRadius': '5px',
                                        'fontWeight': '700',
                                        'fontSize': '.8em',
                                        'borderColor': '#2196f3',
                                        'border': '5px solid #2196f3',
                                        'marginTop': '5px',
                                        'marginLeft': '10px'}}
                                        title="Localização do alvo pelo Google Maps"
                                        />
                                    </div>
                                </>
                            }/>
                         <ToastContainer />
                     </CardBody>
                   </Card>
                </Col>
                )}
              </Row>
            </div>
          </Container>
        </div>
      </>
      </React.Fragment>
    );
      }
  }
}

export default withCookies(Header);





























/*

  passwordStrength(e){
    if(e.target.value === ''){
      this.setState({
        score: 'null'
      })
    }
    else{
      var zxcvbn = require('zxcvbn');
      var pw = zxcvbn(e.target.value);
      this.setState({
        score: pw.score
      });
    }
 }

  crackearRedeSemFio = async (el) => {
          let mac = [];

          if(el.target.value !== undefined){
              mac = el.target.value.split("\n");
          }

          let success = () => toast.success("Operação realizada com sucesso");
          let warning = () => toast.warning("Houve um problema com a API. Tente novamente");
          const dados = {"mac": mac};
          console.log(dados)
          alert("Esse software só pode ser utilizado para fins de estudo")
          const apiResponse = await fetch('http://localhost:8000/api/senhawpa2/', {
          method: "post",
          body: JSON.stringify(dados),
          headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization': `Token ${this.props.cookies.get('token')}`
            }
        }).then(response => response.json())
        .then((response) => alert("A senha da rede é: " + response))
          //.then((res) => this.setState({teste: JSON.stringify(res), loading: false}))
          .then(() => {
                //if(this.state.teste !== ''){
                    success();
                    document.getElementById('password__input').value = ''
                    //console.log(this.state.teste);
               // }else{
                    //warning();
                //}
          });
   }

phishingApFake = async (el) => {
          let ssid = [];

          if(el.target.value !== undefined){
              ssid = el.target.value.split("\n");
          }

          let success = () => toast.success("Operação realizada com sucesso");
          let warning = () => toast.warning("Houve um problema com a API. Tente novamente");
          const dados = {"ssid":  ssid};
          console.log(dados)
          alert("Esse software só pode ser utilizado para fins de estudo")
          const apiResponse = await fetch(`http://localhost:8000/api/wifiphishing/`, {
          method: "post",
          body: JSON.stringify(dados),
          headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization': `Token ${this.props.cookies.get('token')}`
            }
        }).then(response => response.json())
      .then(response => this.setState({
            password: response
       }))
      .then(() => {

      })
   }

   conectarRedeSemFio = async (el) => {
       let ssid = [];

       if(el.target.value !== undefined){
         ssid = el.target.value.split("\n");
       }

       let password = this.state.password;
          //this.setState({ loading: true });
          let success = () => toast.success("Operação realizada com sucesso");
          let warning = () => toast.warning("Houve um problema com a API. Tente novamente");
          const dados = {"ssid": ssid, "password": password};
          console.log(dados)
          const apiResponse = await fetch(`http://localhost:8000/api/conectar/`, {
          method: "post",
          body: JSON.stringify(dados),
          headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization': `Token ${this.props.cookies.get('token')}`
            }
        }).then(response => response.json())
          .then(response => {
                this.setState({
                    sucesso: true,
                    isClose: false,
                    message: response
                });
          });
   }

   desconectarRedeSemFio = async (el) => {
          let ssid = [];

          if(el.target.value !== undefined){
              ssid = el.target.value.split("\n");
          }
          let success = () => toast.success("Operação realizada com sucesso");
          let warning = () => toast.warning("Houve um problema com a API. Tente novamente");
          const dados = {"ssid": ssid};
          console.log(dados)
          const apiResponse = await fetch(`http://localhost:8000/api/desconectar/`, {
          method: "post",
          body: JSON.stringify(dados),
          headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization': `Token ${this.props.cookies.get('token')}`
            }
        }).then(response => response.json())
          .then(response => {
                this.setState({
                    sucesso: true,
                    isClose: false,
                    message: response
                });
          });
   }

   desautenticarRedeSemFio = async (el) => {
          let mac = [];

          if(el.target.value !== undefined){
              mac = el.target.value.split("\n");
          }

          let success = () => toast.success("Operação realizada com sucesso");
          let warning = () => toast.warning("Houve um problema com a API. Tente novamente");
          const dados = {"mac": mac};
          console.log(dados)
          alert("Esse software só pode ser utilizado para fins de estudo")
          const apiResponse = await fetch(`http://localhost:8000/api/desautenticar/`, {
          method: "post",
          body: JSON.stringify(dados),
          headers : {
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization': `Token ${this.props.cookies.get('token')}`
            }
        }).then(response => response.json())
          //.then((res) => this.setState({teste: JSON.stringify(res), loading: false}))
          .then(() => {
                //if(this.state.teste !== ''){
                    success();
                    document.getElementById('password__input').value = ''
                    //console.log(this.state.teste);
               // }else{
                    //warning();
                //}
          });
   }



*/