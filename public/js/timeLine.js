let data = {
   title: 'WAZZAM',
   content: 'Welcome to WAZZAM, where you can charge your social battery!',
   date: getCurrentDate(),
};

// Formatting the current date and making blog-post-template
function getCurrentDate() {
   return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });
}

// rendering a new blog-post template when new post is made. still keeping the template the same
var source = document.getElementById('wazzam-template').innerHTML;
const template = Handlebars.compile(source);
const html = template(date);

document.getElementById('wazzam-container').innerHTML = html;

function createNewBlogPost(newTitle, newContent) {
   data = {
      title: newTitle,
      content: newContent,
      date: getCurrentDate(), //setting new date
   };

   //  re-renders the blog post template
   let updatedHtml = template(data);

   // DOM insertion for updated HTML
   document.getElementById('wazzam-container').innerHTML = updatedHtml;
}

// new blog post in response to user action.
createNewBlogPost(
   'New Blog Post Title',
   'This is the content of the new blog post.',
);
