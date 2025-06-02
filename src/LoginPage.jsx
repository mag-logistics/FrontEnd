import { useNavigate } from "react-router-dom";
import api from "./utils/api.js";

export function LoginOut(){
    localStorage.removeItem("role");
    window.location.href = "/";
}

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        console.log("Im handleLogin!");
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;

        //let user = api.get('/user', username, password);
        let user = username;
        let role = null;

        if (user === "magician") {
            role = "magician";
        } else if (user === "exhaustion") {
            role = "exhaustion";
        } else if (user === "hunter") {
            role = "hunter";
        } else if (user === "storekeeper"){
            role = "storekeeper";
        } else {
            alert("Неверный логин или пароль");
            return;
        }

        // Сохраняем роль
        localStorage.setItem("role", role);

        // Перенаправляем
        navigate(`/${role}`);
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <input name="username" placeholder="Логин" required />
            <input name="password" type="password" placeholder="Пароль" required />
            <button type="submit" className="save-btn">Войти</button>
        </form>
    );
}

export default LoginPage;
