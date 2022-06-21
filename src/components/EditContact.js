import React, {Component} from "react";
import withNavigation from "./withNavigation";


class EditContact extends Component {
    constructor(props) {
        super(props);
        const {id, name, email} = this.props.location.state.contact;
        this.state = {
            id : id,
            name : name,
            email : email
        }
    }

    update = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "") {
            alert("All the fields are mandatory !");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({name: "", email: ""});
        this.props.navigate("/");
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="name" onChange={(e) => this.setState({name : e.target.value})} value={this.state.name}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="email" onChange={(e) => this.setState({email : e.target.value})} value={this.state.email}/>
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        )
    }
}

export default withNavigation(EditContact);;