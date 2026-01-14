import { useNavigate } from "react-router-dom";
import apiService from "./api/api-services.js";
import showMessage from "./utils/MessageWindow.js";

export function LoginOut(){
    sessionStorage.clear()
    window.location.href = "/";
}

// Функция для настройки автоматического логаута
function setupAutoLogout(expirationTime) {
    const timeUntilExpiry = expirationTime - Date.now();

    // Очищаем через заданное время
    if (timeUntilExpiry > 0) {
        setTimeout(() => {
            LoginOut();
        }, timeUntilExpiry);
    }
}

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        apiService.auth.login(email, password)
            .then(res => {
                let data = res.data;
                let role = data.roles[0];
                const expirationTime = Date.now() + (10 * 60 * 1000);

                sessionStorage.setItem('expire_at', expirationTime.toString());
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user_id", data.id);

                setupAutoLogout(expirationTime);
                navigate(`/${role.toLowerCase()}`);
            })
            .catch(err => {
                console.log(err);
                showMessage('Неверный логин или пароль!')
            });
    };

    return (
        <form onSubmit={handleLogin} id='login_form'>
            <h2>Вход</h2>
            <input name="email" type="email" placeholder="Почта" required />
            <input name="password" type="password" placeholder="Пароль" required />
            <button type="submit" className="save-btn">Войти</button>
        </form>
    );
}

export default LoginPage;
