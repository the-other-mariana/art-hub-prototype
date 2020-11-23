# Bohemio

This a prototype of a web app that allows you to log in and upload your art portfolio. <br />

## Development

1. Install `Node.js v10.15.3`.<br />
2. Download and install MongoDB Service from [here](https://www.mongodb.com/es).<br />
3. Download this whole repository.<br />

## Usage

1. Download this repo. <br />
2. Look for `Services` in Windows search field. <br />
3. Once on Services, look for `MongoDB Server` and right-click on `Start`. <br />
4. Go to your folder's directory where this repo was stored. <br />
5. Type on Powershell: `npm start`. <br />
6. Open a web browser and type: `localhost:8000`. <br />

## Internal and External IP

[ifconfig.me](http://ifconfig.me/ip) <br />

Mine: 189.163.88.56 <br />

## Progress

Bohemio starts like with a simple login:<br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/login01.png?raw=true) <br />

Then goes on to let you choose and upload your profile picture. This is a file input that will be stored in the server locally, in a folder called uploads, for simplicity. You can edit your contact information as well. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/contact-info.png?raw=true) <br />

Uploading projects was implemented next, where a modal pops up to configure the projects info and media. Then, the page updates and your projects can be seen. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/projects-front.png?raw=true) <br />

Meanwhile, if the user is a company then shows the following. It is still under construction. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/company-prof.png?raw=true) <br />

So Far, the artist profile looks like the following: <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/projects-gif.gif) <br />

I added 4 types of proyects: picture, video, animation (on loop) and audio. A profile ends up like this. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/project-types.png?raw=true) <br />

Then, the Edit Project option is implemented and an Edit button appears in every project card. The DB is updated as well as the frontend with the new edited info. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/edit-projects.png?raw=true) <br />

There is some nav bar at the top of a user view: <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/nav-bar.png?raw=true) <br />

If you click on the search button, the view will provide the results of your search. This is only user search for now, but the search accepts sub strings and is not case sensitive, in order to show more results. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/search-results-02.png?raw=true) <br />

You can now follow any artist or company you find in searching mode and only if you havent followed that account previously. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/follow-found-user.png?raw=true) <br />

A company can create a Job Vacancy, with job title, descriptions and attached document. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/vacancy-fields.png?raw=true) <br />

And therefore, users can apply and send their CV. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/apply.png?raw=true) <br /> <br />

This is seen by users when they search the company profile, and they can apply by uploading their CV. Then the company starts seeing applicants on its job offer.

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/applicants-02.png?raw=true) <br />

A profile of an artist then looks as follows. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/current-profile.png?raw=true) <br />

Finally, a logo was added. <br />

![alt text](https://github.com/the-other-mariana/art-hub-prototype/blob/master/evidences/logo.png?raw=true) <br />

## Demo Output
 hellow

## Helpful Links

[upload files](https://www.youtube.com/watch?v=9Qzmri1WaaE&t=392s) <br />