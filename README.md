# Whatsapp-web Clone

## :ribbon:Languages and Tools:

![NodeJS](https://img.shields.io/badge/nodejs%20-%ffb400.svg?&style=for-the-badge&logo=nodeJs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/expressjs%20-%23FF6F00.svg?&style=for-the-badge&logo=express&logoColor=white)
![ReactJS](https://img.shields.io/badge/reactjs%20-%2300599C.svg?&style=for-the-badge&logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb%20-%2320232a.svg?&style=for-the-badge&logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/redux%20-%ffb400.svg?&style=for-the-badge&logo=redux&logoColor=white)
![Redux-Toolkit](https://img.shields.io/badge/reduxtoolkit%20-%23150458.svg?&style=for-the-badge&logo=redux-toolkit&logoColor=white)
![Socket.io](https://img.shields.io/badge/socket.io%20-%23FF6F00.svg?&style=for-the-badge&logo=socket.io&logoColor=white)
![CSS](https://img.shields.io/badge/css%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
![MaterialUI](https://img.shields.io/badge/materialui%20-%23777BB4.svg?&style=for-the-badge&logo=mui3&logoColor=white)

## How to run:

- Clone this repository or fork it.
  - To clone this repository type `git clone https://github.com/nishihere19/whatsapp-web-clone.git` on your command line
  - To fork this repository, click fork button of this repository then type `git clone https://github.com/<your username>/whatsapp-web-clone.git`
- Inside `server` folder, create a new file named `.env` which stores informations about server side such as `ATLAS_URI`, `SECURITY_KEY` and `CLIENT_URL` informations
  - store your database URI inside `ATLAS_URI` variable
  - store your security key inside `SECURITY_KEY` variable
  - store your client url inside `CLIENT_URL` variable
  - example:
  ```
  ATLAS_URI =mongodb+srv://admin:<password>@cluster0.8aezk.gcp.mongodb.net/whatsappClone?retryWrites=true&w=majority
  SECURITY_KEY = D73373D9B4ED6FEC5B8B2DAF6WA929B1C7D14CDC88B196EBDCCEA77AFF7BB9
  CLIENT_URL = http://localhost:3000/
  ```
- Inside `client` folder, create a new file called `.env` which stores your information about client side such as `REACT_APP_SECURITY_KEY` and `REACT_APP_BACKEND_URL` informations

  - store your security key inside `REACT_APP_SECURITY_KEY` variable, note that this value must same as `SECURITY_KEY` in `server/.env` file
  - store your server url inside `REACT_APP_BACKEND_URL`
  - example:

  ```
  REACT_APP_SECURITY_KEY = D73373D9B4ED6FEC5B8B2DAF6WA929B1C7D14CDC88B196EBDCCEA77AFF7BB9
  REACT_APP_BACKEND_URL = http://localhost:5000
  ```

- Install all dependencies

  - Client side: on the `client` directory type `npm install`(or `yarn`)
  - Server side: on the `server` directory type `npm install`(or `yarn`)

- Run it on node js:
  - Client side: on the `client` directory type `npm start` (or `yarn`)
  - Server side: on the `server` directory type `npm start` (or `yarn`)
