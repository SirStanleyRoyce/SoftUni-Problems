import { useNavigate } from "react-router";
import { register } from "../services/authService";

export default function Register({ onRegister }) {
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { email, password, rePass } = Object.fromEntries(form);

        if (password !== rePass) {
            alert('Passwords don\'t match');
        }
        else {
            try {
                await register(email, password);
                onRegister();
                navigate('/');
            }
            catch (e) {
                console.error(e.message);
            }
        }
    }

    return (
        <section id="register-page" className="register" >
            <form id="register-form" method="POST" onSubmit={submitHandler}>
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p className="field">
                        <label htmlFor="repeat-pass">Repeat Password</label>
                        <span className="input">
                            <input type="password" name="rePass" id="repeat-pass" placeholder="Repeat Password" />
                        </span>
                    </p>
                    <input className="button submit" type="submit" value="Register" />
                </fieldset>
            </form>
        </section>
    )
}