import { useNavigate } from "react-router-dom";
import apiService from "./api/api-services.js";
import showMessage from "./utils/MessageWindow.js";

export function LoginOut(){
    sessionStorage.removeItem("role");
    window.location.href = "/";
}



function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        console.log("Im handleLogin!");
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;


        apiService.auth.login(email, password)
            .then(res => {
                let data = res.data;
                let role = data.roles[0];
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user_id", data.id);
                navigate(`/${role.toLowerCase()}`);
            })
            .catch(err => {
                console.log(err);
                showMessage('Неверный логин или пароль!')
            });

        // if (user === "magician" && password === "magician") {
        //     role = "magician";
        //     user_id = "71b0af32-887c-4903-bc54-af3f96481e9e";
        // } else if (user === "exhaustion" && password === "exhaustion") {
        //     role = "exhaustion";
        //     user_id = "74b0af32-887c-4903-bc54-af3f96481e9e";
        // } else if (user === "hunter" && password === "hunter") {
        //     role = "hunter";
        //     user_id = "73b0af32-887c-4903-bc54-af3f96481e9e";
        // } else if (user === "storekeeper" && password === "storekeeper"){
        //     role = "storekeeper";
        //     user_id = "72b0af32-887c-4903-bc54-af3f96481e9e";
        // } else {
        //     alert("Неверный логин или пароль");
        //     return;
        // }
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
