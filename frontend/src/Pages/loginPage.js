import React, {Component} from 'react';


class loginPage extends Component{

    constructor(props){
        super(props);
        this.emailEl =React.createRef();
        this.passwordEl =React.createRef();
    }

    submitWorker =event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        if(email.trim().length === 0 || password.trim().length === 0){
            return;
        }
        console.log(email,password)

        const requestBody = {
            //kmr se ut såhär nånting med authlogin
            query: `
            query {
                login(userInput: {email: "${email}", password:"${password}"}) {
                    userID
                    token
                    tokenExperation
                }
            }
        `
        };
        fetch('mongodb://localhost/m7011e:8000/graphql',{
            method: 'POST',
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res =>{
            if (res.status !== 200 && res.status !== 201){
                throw new Error('uhoh');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });

 };
    render () {
    return (
    <form className="loginForm" onSubmit={this.submitWorker}>
        <div className="formForLogin">
            <label htmlFor="email"> email</label>
            <input type="email" id="email"ref={this.emailEl}/>
        </div>
        <div className="formForLogin">
            <label htmlFor="password"> password</label>
            <input type="password" id="password"ref={this.passwordEl}/>
        </div>
        <div className="formAction">
            <button type="submit">Login</button>
            <button type="button">SingupPage</button>
        </div>
    </form>

          );
    } 
}

export default loginPage