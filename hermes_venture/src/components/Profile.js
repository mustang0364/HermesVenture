import React from 'react';
import ShoppingNavbar from './Shopping-Navbar';

const Profile = () => {
    componentDidMount() {
    axios.get('/getUser').then(res => {
        if(res.data !== 'Not Authorized') {
            this.setState({user: res.data})
        } else {
            this.props.history.push('/shopping')
        }
    })
    
}
    return (
        <div className="profilemain">
            <ShoppingNavbar />
            <div className="userinfo">
            {props.user.name}
            {props.user.email}
            </div>
        </div>
    );
}
export default Profile;
