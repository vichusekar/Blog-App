# I create an blog app that includes CRUD features

## Front-end
I first create a react application using npx-create-react-app

I install require dependencies using node packaging manager(npm) like react-bootstrap(use for create responsive design), react-router-dom(use for navigating one to another endpoint route), axios(use for request to API to access the data), formik(use for form validation), react-toastify(use for response from the back-end to show the messages)

After I install the dependencies I create components because we use the components it will be easily access and edit the code so the components have every aspects of the page what we have see that page

Such a navbar, sign-up, sign-in, forgot password, blog creation, content editable form, delete

We acheive those things using HTML, CSS, Bootstrap Framework, JavaScript, React 

## back-end

In back-end I create a server using npm(node packaging manager) init in node.js and the npm init command install required packages in package.json 

After the step I install back-end dependencies like Express(passing data between server and routes), nodemailer(sending the mail to authenticated user), cors(corss origin resource sharing), dotenv(it help us itegrate .env file to back-end application), jsonwebtoken(share safe information between client and server), bcryptjs(store the password as hashing algorithm), mongodb(known as a database)

Create a components like 

authentication for authenticate the user includes password hashing,

config for connect with database via .env file,

model for how the data will store and which format,

route for navigating the endpoint and acheiving the API request,

.env file for store the database information,

index file for connect all above these things

