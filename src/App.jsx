import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Table, Button, Form } from 'react-bootstrap'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tareas: [],
      descripcion: '',
      estado: 'pendiente',
      id: 0,
      pos: null
    }

    this.cambioDescripcion = this.cambioDescripcion.bind(this)
    this.guardar = this.guardar.bind(this)
    this.mostrar = this.mostrar.bind(this)
    this.eliminar = this.eliminar.bind(this)
    this.cambiarEstado = this.cambiarEstado.bind(this)
  }

componentDidMount() {
  // Simulamos datos del backend
  const datosFalsos = [
    { id: 1, descripcion: 'Aprender React', estado: 'pendiente' },
    { id: 2, descripcion: 'Hacer una app de tareas', estado: 'completado' }
  ]
  this.setState({ tareas: datosFalsos })
}

  cambioDescripcion(e) {
    this.setState({
      descripcion: e.target.value
    })
  }

 mostrar(id, index) {
  const tarea = this.state.tareas.find(t => t.id === id)
  this.setState({
    descripcion: tarea.descripcion,
    id: tarea.id,
    pos: index
  })
}
guardar(e) {
  e.preventDefault()

  if (!this.state.descripcion.trim()) {
    alert("La descripción no puede estar vacía")
    return
  }

  const { id, descripcion, estado } = this.state
  const nuevaTarea = { id: Date.now(), descripcion, estado }

  if (id > 0) {
    // Actualizar tarea
    const temp = [...this.state.tareas]
    temp[this.state.pos] = { id, descripcion, estado }
    this.setState({
      tareas: temp,
      descripcion: '',
      id: 0,
      pos: null
    })
  } else {
    // Agregar nueva tarea
    this.setState(prevState => ({
      tareas: [...prevState.tareas, nuevaTarea],
      descripcion: '',
      id: 0,
      pos: null
    }))
  }
}


 eliminar(id) {
  const temp = this.state.tareas.filter(t => t.id !== id)
  this.setState({ tareas: temp })
}

cambiarEstado(id, pos) {
  const temp = [...this.state.tareas]
  temp[pos].estado = 'completado'
  this.setState({ tareas: temp })
}

  render() {
    return (
      <div>
        <Container>
          <h1 className="my-4">Lista de Tareas</h1>
          <Form onSubmit={this.guardar}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Escribe una tarea"
                value={this.state.descripcion}
                onChange={this.cambioDescripcion}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>

          <Table striped bordered hover variant="dark" className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tareas.map((tarea, index) => (
                <tr key={tarea.id}>
                  <td>{tarea.id}</td>
                  <td>{tarea.descripcion}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={tarea.estado === 'completado'}
                        readOnly
                      />
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => this.mostrar(tarea.id, index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => this.cambiarEstado(tarea.id, index)}
                      disabled={tarea.estado === 'completado'}
                    >
                      Completar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.eliminar(tarea.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default App
