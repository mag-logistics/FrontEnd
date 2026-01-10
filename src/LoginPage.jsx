import { useNavigate } from "react-router-dom";

export function LoginOut(){
    sessionStorage.removeItem("role");
    window.location.href = "/";
}



function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        console.log("Im handleLogin!");
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;

        //let user = apiClient.get('/user', username, password);
        let user = username;
        let role = null;
        let user_id = null;

        if (user === "magician" && password === "magician") {
            role = "magician";
            user_id = "71b0af32-887c-4903-bc54-af3f96481e9e";
        } else if (user === "exhaustion" && password === "exhaustion") {
            role = "exhaustion";
            user_id = "74b0af32-887c-4903-bc54-af3f96481e9e";
        } else if (user === "hunter" && password === "hunter") {
            role = "hunter";
            user_id = "73b0af32-887c-4903-bc54-af3f96481e9e";
        } else if (user === "storekeeper" && password === "storekeeper"){
            role = "storekeeper";
            user_id = "72b0af32-887c-4903-bc54-af3f96481e9e";
        } else {
            alert("Неверный логин или пароль");
            return;
        }

        // Сохраняем роль
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("user_id", user_id);

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
