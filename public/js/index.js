var data = {

    title : "WAZZAM",
    content: "Welcome to WAZZAM, where you can charge your social battery!",
    date: getCurrentDate(),
};

// Formatting the current date
function currentDate() {
    var now = new Date()
    return now.toLocaleDateString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

//rendering blog-post template
var source = document.getElementById("wazzam-template").innerHTML;
const template = Handle.compile(source);
const html = template(date);

document.getElementById("wazzam-container").innerHTML = html;

data = {
    title
}