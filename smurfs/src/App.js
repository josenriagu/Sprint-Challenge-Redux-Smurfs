import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, NavLink } from 'react-router-dom';
import { fetchSmurfs, addNewSmurf, updateSmurf, deleteSmurf } from './actions'
import Home from './components/Home';
import Smurfs from './components/Smurfs';
import SmurfForm from './components/SmurfForm';

class App extends Component {

  state = {
    form: {
      name: "",
      age: 0,
      height: 0
    },
    editMode: false,
    smurfToEdit: null
  }


  // Initialise on componentDidMount
  componentDidMount() {
    this.props.fetchSmurfs();
  }

  inputChange = (field, value) => {
    this.setState((state) => {
      return {
        form: {
          ...state.form,
          [field]: value
        }
      };
    });
  }

  changeHandler = (e) => {
    this.inputChange(e.target.name, e.target.value);
  }

  addSmurf = e => {
    e.preventDefault();
    const { name, age, height } = this.state.form;
    this.props.addNewSmurf({ name, age, height })
    window.location.pathname = "/smurfs/list"
  }

  setEdit = (id) => {
    const smurfToEdit = this.props.smurfs.find(smurf => smurf.id === id);
    this.setState({
      form: {
        name: smurfToEdit.name,
        age: smurfToEdit.age,
        height: smurfToEdit.height
      },
      editMode: true,
      smurfToEdit,
    });
  }

  updateSmurf = (event, id) => {
    event.preventDefault()
    const { name, age, height } = this.state.form;
    this.props.updateSmurf({ id, name, age, height })
    window.location.pathname = "/smurfs/list"
  }

  deleteSmurf = id => {
    this.props.deleteSmurf(id)
  }

  render() {
    return (
      <div className="app-wrapper">
        <section>
          <h1>Smurfs Village</h1>
          <div>
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to={
                (this.state.editMode)
                  ?
                  "/smurfs/edit-smurf"
                  :
                  "/smurfs/add-smurf"
              }
            >
              Add Smurf
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/smurfs/list"
            >
              View Smurfs
            </NavLink>
          </div>
        </section>

        <section className="app-section">
          <Route
            exact
            path="/"
            render={Home}
          />
          <Route
            path="/smurfs/list"
            render={props =>
              <Smurfs
                {...props}
                setEdit={this.setEdit}
                deleteSmurf={this.deleteSmurf}
                smurfs={this.props.smurfs}
              />
            }
          />
          <Route
            path={
              (this.state.editMode)
                ?
                "/smurfs/edit-smurf"
                :
                "/smurfs/add-smurf"
            }
            render={props =>
              <SmurfForm
                {...props}
                addSmurf={this.addSmurf}
                changeHandler={this.changeHandler}
                editMode={this.state.editMode}
                smurfToEdit={this.state.smurfToEdit}
                updateSmurf={this.updateSmurf}
                {...this.state.form}
              />
            }
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs
  }
}

export default connect(mapStateToProps, { fetchSmurfs, addNewSmurf, updateSmurf, deleteSmurf })(App);