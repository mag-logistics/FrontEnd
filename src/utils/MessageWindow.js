
function showMessage(message, is_error = true) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add(is_error ? "error" : "good");
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 3000);
}

export default showMessage;