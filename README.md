CS 465 Full Stack Development

Architecture

I have gained more insights into how the parts of a full-stack application integrate in CS 465. On the client-side for Travlr, I applied Express, HTML, JavaScript, and Handlebars to code. As for the admin side, I developed a single page application using Angular. What differed is that on the Angular side, there was more of an interactive experience since adding or editing the trip details did not involve opening a new page each time. I applied MongoDB on the back-end since the NoSQL database system fits the JSON-like data format.

Functionality

JSON played an integral role in the process since it allowed to make sure that frontend and backend are connected. The API could send trip data in JSON format, while Angular app could take advantage of it. I also refactored various aspects of the project along the way. For instance, I created reusable Angular components which were able to contain all the trip information, while the service was in charge of making API calls.&nbsp;

Testing

API testing helped to learn more about HTTP methods and endpoints. Thus, I used GET requests in order to retrieve data, POST requests to send new data, PUT requests to update already existing trips and DELETE request to remove any data. The security aspect of API made the testing process a bit tricky. Some endpoints could be accessed only after logging in and therefore I had to use JSON Web Tokens for authentication.

Reflection

In general, this class helped me understand full stack development in much greater depth compared to my previous knowledge. I got more practice using Node.js, Express, Angular, MongoDB, Mongoose, REST APIs, MVC architecture, JSON, authentication, and API testing. The main lesson I learned was that all of these components have to be properly integrated in order for an application to work right. I think that this project will provide me with something useful to present to future employers since it will prove that I can develop and test a full stack application.