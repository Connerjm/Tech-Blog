$(document).ready(() =>
{
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(() =>
    {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    $("#login-or-register-button").click(async event =>
    {
        event.preventDefault();

        const username = $("#username-input").val().trim();
        const password = $("#password-input").val().trim();

        if (username && password)
        {
            const response = await $.ajax({
                url: $("#login-or-register-button").text().trim() === "Login" ? "/api/users/login" : "/api/users",
                type: "POST",
                data: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok)
            {
                document.location.replace("/");
            }
            else
            {
                alert(response.statusText);
            }
        }
    });
});