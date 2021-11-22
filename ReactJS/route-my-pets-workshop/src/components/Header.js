import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header id="site-header">

            <nav class="navbar">
                <section class="navbar-dashboard">
                    <Link to="/">Dashboard</Link>

                    <div id="guest">
                        <Link class="button" to="/login">Login</Link>
                        <Link class="button" to="/register">Register</Link>
                    </div>

                    <div id="user">
                        <span>Welcome, email</span>
                        <Link class="button" to={`/my-pets/${localStorage.userId}`}>My Pets</Link>
                        <Link class="button" to="/add-pet">Add Pet</Link>
                        <Link class="button" to="/logout">Logout</Link>
                    </div>
                </section>
            </nav>
        </header>
    )
}