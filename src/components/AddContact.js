import React, {Component} from "react";
import withNavigation from "./withNavigation";


class AddContact extends Component {
    state = {
        name : "",
        email : ""
    }
    handleNameChange(e) {
        // this.setState({
        //     ...this.state,
        //     name : e.target.value
        // })
        this.setState({name : e.target.value})
    }

    handleEmailChange(e) {
        // this.setState({
        //     ...this.state,
        //     email : e.target.value
        // })
        this.setState({email : e.target.value})
    }

    add = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "") {
            alert("All the fields are mandatory !");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({name: "", email: ""});
        this.props.navigate("/");
    }

    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="name" onChange={(e) => this.handleNameChange(e)} value={this.state.name}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="email" onChange={(e) => this.handleEmailChange(e)} value={this.state.email}/>
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        )
    }
}

export default withNavigation(AddContact);;