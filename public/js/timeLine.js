let data = {

    title : "WAZZAM",
    content: "Welcome to WAZZAM, where you can charge your social battery!",
    date: currentDate(),
};

// Formatting the current date and making blog-post-template
function getCurrentDate() {
    var now = new Date()
    return now.toLocaleDateString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

//rendering a new blog-post template when new post is made. still keeping the template the same
var source = document.getElementById("wazzam-template").innerHTML;
const template = Handlebars.compile(source);
const html = template(date);

document.getElementById("wazzam-container").innerHTML = html;

function createNewBlogPost(newTitle, newcontent){
    data = {
        title: newTitle, 
        content: newContent,
        date: currentDate(), //setting new date 
    
};

//  Re-render the blog post template
let updatedHtml = template(data);

// DOM insertion for updated HTML 

document.getElementById("wazzam-container").innerHTML = updatedHtml;

}







