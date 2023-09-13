let data = {

    title : "WAZZAM",
    content: "Welcome to WAZZAM, where you can charge your social battery!",
    date: getCurrentDate(),
};

// Formatting the current date and making blog-post-template
function currentDate() {
    var now = new Date()
    return now.toLocaleDateString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

//rendering a new blog-post template when new post is made. still keeping the template the same
var source = document.getElementById("wazzam-template").innerHTML;
const template = Handle.compile(source);
const html = template(date);

document.getElementById("wazzam-container").innerHTML = html;

data = {
    title: newTitle, 
    content: newContent,
    date: currentDate(), //setting new date 

}

var updatedHtml = template(data)

// DOM insertion for updated HTML 
document.getElementById("wazzam-container").innerHTML = updatedHtml;


