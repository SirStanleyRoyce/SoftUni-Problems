import { useNavigate } from "react-router";

import { login } from "../services/auhtService";

export default function Login() {
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(form);

        try {
            await login(email, password);
            navigate('/');
        }
        catch {
            
        }
    }


    return (
        <section id="login-page" className="login">
            <form id="login-form" method="POST" onSubmit={submitHandler}>
                <fieldset>
                    <legend>Login Form</legend>
                    <p className="field">
                        <label htmlFor="email">Email</label>
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="Email" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </span>
                    </p>
                    <input className="button submit" type="submit" value="Login" />
                </fieldset>
            </form>
        </section>
    )
}