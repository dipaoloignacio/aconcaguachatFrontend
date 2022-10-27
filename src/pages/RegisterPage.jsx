import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import Swal from 'sweetalert2'
import '../css/login-register.css';

function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [exito, setExito] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: ''
  })

  const onChange = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const { email, password, nombre } = form;

    const ok = await register(email, password, nombre);

    if (!ok.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ok.msg,
      });
    } else {
      setExito(true)
      setForm({
          nombre: '',
          email: '',
          password: ''
        })
        
      setTimeout(() => {
        setExito(false)
      }, 3000)
    }
  }

  const todoOk = () => {
    return (form.email.length > 0 && form.nombre.length && form.password.length > 5) ? true : false;
  }

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-50 p-b-90">
            <form
              className="login100-form validate-form flex-sb flex-w"
              onSubmit={(e) => onSubmit(e)}
            >
              <span className="login100-form-title mb-3">
                Chat - Registro
              </span>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={onChange}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={onChange}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input mb-3">
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={onChange}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="row mb-3">
                <div className="col text-right">
                  <Link to="/auth/login" className="txt1">
                    Ya tienes cuenta?
                  </Link>
                </div>
              </div>

              <div className="container-login100-form-btn m-t-17">
                <button
                  className="login100-form-btn"
                  type='submit'
                  disabled={!todoOk()}
                >
                  Crear cuenta
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RegisterPage