$(document).ready(() =>
{
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(() =>
    {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    $("#switch").click(() =>
    {
        if ($("#login-or-register-button").text().trim() === "Login")
        {
            document.location.replace("/register");
        }
        else
        {
            document.location.replace("/login");
        }
    });

    $("#login-or-register-button").click(event =>
    {
        event.preventDefault();

        const username = $("#username-input").val().trim();
        const password = $("#password-input").val().trim();

        if (username && password)
        {
            $.ajax({
                url: $("#login-or-register-button").text().trim() === "Login" ? "/api/users/login" : "/api/users",
                type: "POST",
                data: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
                success: () => { document.location.replace("/") },
                error: (request, text, error) => {
                    alert(`Wrong credentials. Try again.`);
                }
            });
        }
    });

    $("#logout-script").click(() =>
    {
        $.ajax({
            url: "api/users/logout",
            type: "POST",
            headers: { "Content-Type": "application/json" },
            success: () => { document.location.replace("/login") },
            error: (request, text, error) => {
                alert(`Something went wrong! Status: ${text}; Error ${error}`)
            }
        });
    });
});