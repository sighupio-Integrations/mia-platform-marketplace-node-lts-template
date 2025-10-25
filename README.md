# SSC Node.js custom plugin template walkthrough

This walkthrough will help you learn how to create a Node.js microservice using SSC's Node.js from scratch.

## Create a microservice

In order to do so, access to [Mia-Platform DevOps Console](https://console.cloud.mia-platform.eu/login), create a new project and go to the **Design** area. Once there, select _Microservices_ and go ahead creating a new one: that will take you to the [Mia-Platform Marketplace](https://docs.mia-platform.eu/development_suite/api-console/api-design/marketplace/), where you can find a set of Examples and Templates that can be used to set-up microservices with a pre-defined and tested function.

For this walkthrough select the following template: **SSC Node.js template**. After clicking on ut you will be asked to give the following information:

- Name (Internal Hostname)
- GitLab Group Name
- GitLab Repository Name
- Docker Image Name
- Description (optional)

You can read more about these fields in the [Manage your Microservices from the Dev Console](https://docs.mia-platform.eu/development_suite/api-console/api-design/services/) section of the Mia-Platform documentation.

Pick the name you prefer for your microservice: in this walkthrough we'll refer to it as **sighup-nodejs-demo**.
Then, fill the other required fields and confirm that you want to create a microservice. You have now generated a _sighup-nodejs-demo_ repository that will be deployed on Mia-Platform's [Nexus Repository Manager](https://nexus.mia-platform.eu/) as soon as the CI build script is successful.

## Save your changes

It is important to know that the microservice that you have just created is not saved yet on the DevOps Console. It is not essential to save the changes that you have made, since you will later make other modifications inside of your project in the DevOps Console.
If you decide to save your changes now, remember to choose a meaningful title for your commit (e.g "created service sighup_nodejs_demo"). After some seconds you will be prompted with a popup message which confirms that you have successfully saved all your changes.
A more detailed description on how to create and save a Microservice can be found in [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#2-service-creation) section of the Mia-Platform documentation.

## Look inside your repository

After having created your first microservice (based on this template) you will be able to access to its git repository from the DevOps Console. You will find an _index.js_ file in the root as the project entry point, while the business logic will be implemented in the _src_ folder: we provided a simple structure for you to start with, but you are free to change it as you prefer. In particular, you will find some useful starter http endopoints already implemented, that will be useful to integrate with kubernetes.
We have also included a number of Code Quality tools and example configurations, such as:
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/), to help keeping code style consistent and clean;
- [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest), to help you write and run unit as well as end-to-end tests;
- [Commitlint](https://commitlint.js.org/#/) and [Husky](https://typicode.github.io/husky/#/), to help you write meaningful commit messages.

The repository also contains a rich _Makefile_, containing additional linters and fixers for other languages (e.g. bash, yaml, markdown): you can find the list of all the available commands by typing `make help` in your terminal.

## Add an Hello World route

Now that you have successfully created a microservice from our SSC Node.js template you will add an _weather_ route to it.

First of all, you need to create a dedicated feature folder: in this walkthrough we will create one called _weather_ inside the _src/features_ folder.

Then, you will create a file called _index.js_ inside the _weather_ folder. This file will contain the logic of the _weather_ route. Let's see it:

```js
import express from 'express';

export const weatherRouter = express.Router();

weatherRouter.get('/weather', (req, res) =>
  res
    .setHeader('Content-Type', 'application/json')
    .send(JSON.stringify({ message: "It's sunny!" })),
);
```

Besides the trivial business logic that's just printing some static html, you can see that we are using a dedicated `express.Router` instance to handle the route logic. With that under our belt, you need to open the _index.js_ file in the root folder and modify it so that it will look like the following:

```js
import express from 'express';

import { homeRouter } from './src/features/home/index.js';
import { kubeRouter } from './src/features/kubernetes/index.js';
import { weatherRouter } from './src/features/weather/index.js';

const app = express();
const port = 3000;

app.use(homeRouter);
app.use(weatherRouter);
app.use(kubeRouter);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`),
);

```

Last but not least, you need to add a new test case to the _src/features/weather/index.test.js_ file. This test will check that the _weather_ route is working as expected. Let's see it:

```js
import express from 'express';
import request from 'supertest';

import { weatherRouter } from './index.js';

const app = express();

app.use(weatherRouter);

describe('Weather page', () => {
  it('should return a 200 status code', async () => {
    await request(app)
      .get('/weather')
      .expect('Content-Type', /application\/json/)
      .expect('Content-Length', '25')
      .expect(200)
      .expect('{"message":"It\'s sunny!"}');
  });
});
```

By running the server and visiting the `http://localhost:3000/weather` route, you can also test it's working as expected yourself:

```json
{ "message": "It's sunny!" }
```

After committing these changes to your repository, you can go back to Mia Platform DevOps Console.

## Expose an endpoint to your microservice

In order to access to your new microservice it is necessary to create an endpoint that targets it. The _Step 3_ of the [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#3-creating-the-endpoint) section of the Mia-Platform documentation explains in detail how to to do so from the DevOps Console.

For the sake of this walkthrough you will create an endpoint to your _sighup-nodejs-demo_. In order to do so, select _Endpoints_ from the Design area of your project and then create a new one.
Now you need to choose a path for your endpoint and connect it to your microservice. Give the following path to your endpoint: **/weather**. Then, specify that you want to connect your endpoint to a microservice and select _sighup-nodejs-demo_.

## Save your changes once more

After having created an endpoint for your microservice, you should **save the changes** that you have done to your project in the DevOps console, in a similar way to what you have previously done after the microservice creation.

## Deploy

Once all the changes that you have made are saved, you should deploy your project through the DevOps Console: you can do so within its **Deploy** area.
Once there, select the environment and the branch you have worked on and confirm your choices by clicking on the _deploy_ button. When the deploy process is finished, you will be informed by a pop-up message.
The _Step 5_ of the [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#5-deploy-the-project-through-the-api-console) section of the Mia-Platform documentation explains in detail how to correctly deploy your project.

## Try it

If you now run the following command in your terminal (remember to replace `<YOUR_PROJECT_HOST>` with the actual host of your project):

```shell
curl <YOUR_PROJECT_HOST>/weather
```

you should see a message that looks like this:

```json
{ "status": 200, "message": "It's sunny!" }
```

Congratulations! You have successfully learnt how to modify a blank template into an _Hello World_ Node.js microservice!
