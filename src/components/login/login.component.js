import React, { Component } from 'react';
import './login.component.css';
import * as LoginService from '../../services/login.service';
import PropTypes from 'prop-types';


class LoginComponent extends Component {

    validLogin = true;
    constructor(props){
      super(props);
      this.state = {
        nombre: '',
        pass: '',
        validLogin: true
      }
      this.onChange = this.onChange.bind(this);
      this.enviarForm = this.enviarForm.bind(this);
    }

    componentWillMount(){
      LoginService.getUsuarios();
    }

    onChange(e){
      if(e.target.type === "email"){
        this.setState({ nombre: e.target.value});
      }else if(e.target.type === "password"){
        this.setState({ pass: e.target.value});
      }
    }


    enviarForm(event) {
      event.preventDefault();
       let nombre = this.refs.nombre.value;
       let pass = this.refs.pass.value;
      this.validLogin = LoginService.validUsuario(nombre,pass);
      this.setState({validLogin: this.validLogin});

      if (this.validLogin) {
          this.props.history.push('/productos');
      }else{
        this.setState({ nombre: ""});
        this.setState({ pass: ""});
        setTimeout(()=>{ this.setState({validLogin: true}); }, 3000);
      }

    }
    render() {
      return (
        <div id="body">
          <div className="main">
            <div className="login-container">
            { !this.state.validLogin ?  <div className="alert alert-danger animated fadeIn" role="alert">
                Credenciales incorrectas.
                </div>:null}
              <div className="callout primary login">
                <h4>Inicia sesión</h4>
                <form id="formLogin" onSubmit={ this.enviarForm }>
                  <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico:</label>
                    <input type="email"
                           className="form-control"
                           id="correo"
                           placeholder="Correo"
                           name="nombre"
                           ref="nombre"
                           onChange= { this.onChange }
                           value={ this.state.nombre }
                           required
                           pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                           />

                      <label className="error">Debe ingresar email correcto</label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="pass"
                        placeholder="Contraseña"
                        name="pass"
                        ref="pass"
                        onChange= { this.onChange }
                        value={ this.state.pass }
                        required/>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

LoginComponent.PropTypes = {
  match:PropTypes.any
}

export default LoginComponent;
