# Chuckled
This project was submitted at Hacklarious 2020 Hackathon. I implemented entirety of the frontend (designed by Michelle Kim https://devpost.com/myjkim13) This README will focus on my **individual** contributions/experiences. 

Here is our demo video: https://www.youtube.com/watch?v=efHmg_FvdRg&feature=emb_title

Here is another sample of me taking a picture with a water bottle => resulting in getting a water joke and me uploading a cat image => resulting in a cat joke: https://youtu.be/eI3-Kkls124

## Inspiration
Bored on your phone because of quarantine? Want something funny to text your friends? Upload any photo on Chuckled and receive a generated joke based on your photo. Jokes on you if you haven't (used) Chuckled.

## What it does
Once you open the website, you will have two options: Upload a photo from your computer or take a photo on your webcam. After submitting the photo, Chuckled will look at the image and use Google Cloud's Machine Learning technology to generate a joke.

## How I built it
Frontend Used React to implement the client. Due to wanting some practice with it, I used the React Hooks approach. There are two main functionalities: uploading an image or taking a snapshot from the computer’s camera. The uploading component was done with a simple input tag with a type of “file.” The video aspect took some more work. The method I used to implement was to stream the content from the computer's camera and then have a button that draws onto a canvas HTML tag. I took this drawing, then converted it into a blob type, making it use to push into a FormData object. Next, through an Axios post request to our servers, I sent the form data. As a response, I got a JSON object with the joke text and link to the image. I used this information, with the help of React Router, and created another display page. 

## Challenges I ran into
A huge challenge was the upload feature. I learned how to convert a file into FormData to make it much easier to send to our server. A challenge I had with React Router was passing state between two components on different Routes (more about it in the "What I Learned" section).

## Accomplishments that I am proud of
For the frontend, I was proud of setting up a live stream and being able to take a snapshot of that stream at any moment. It is an useful feature which I am sure I will implement in the future. Also, I am proud of finally not spending hours on css formatting. I feel like I am starting to get Bootstrap down.   

## What I learned
For the frontend, I learned the power and simplicity of using both React Hooks and CSS modules. CSS modules is a life saver when it comes to worrying about if multiple components have the same class names. When it comes to React Hooks, one thing I learned was the useRef propery, which lets me reference DOM elements. Another very useful property that I learned about React Hooks was the useHistory property. This made it easy to go to the next page when the upload was complete. Also, this solved the problem of passing state to another Route, when paired with the useLocation property. I also learned how useful vanilla JS can be, since most of the live video portions were basic JS/HTML. 

## What's next for Chuckled.
Being able to upload videos.
Being able to create an account and save your images.
Being able to share your images with social media accounts.

## Technologies I Used
+ React (with Hooks)
+ Axios
+ Bootstrap
+ React Router
+ CSS Modules
