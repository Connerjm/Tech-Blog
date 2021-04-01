module.exports =
{
    format_date: date =>
    {
        return date.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"}) + " " + date.toLocaleDateString("en-US");
    }
}