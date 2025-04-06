# Chat Application Frontend

# Steps to Set up the Development Server

The Chat Application project uses Typescript for the backend. There are two methods that you could use to set up the development environment. One is to set up the environment locally in your machine which requires certain pre-requisites to be installed on your machine. The Second method is to use docker. The following are the steps outlined to do the same.

## Local Development Environment

### Pre-requisites

1. [**Node.js**](https://nodejs.org/en/download): A JavaScript runtime environment

2. [**NPM**](https://www.npmjs.com/): Node Package Manager to install packages. *Please Note that installing Node.js automatically installs NPM on your machine*

3. [**Git**](https://git-scm.com/downloads): To clone the repository and for Version Control

### Steps

1. First Make sure that the above pre-requisites are installed successfully, by typing the following commands on the command line

```shell
node -v
npm -v
git -v
```

2. Clone the repository

```shell
git clone https://github.com/ramya487/typescript
```

3. Install pnpm (Lightweight alternate package manager to npm)

```shell
npm install pnpm -g
```

4. Navigate to the frontend directory and install the packages

```shell
cd typescript
pnpm install
```

5. Set up environment variables

Create a ```.env``` file. Refer to the file `.env.mock` to configure the environment variables required for the project

6. To Start the server for development execute

```shell
pnpm run dev
```

7. To Start the server for production execute

```shell
pnpm run build
pnpm run start
```

8. Now you could access your backend via the url [```http://localhost:8000```](http://localhost:3000)


## Using Docker

### Pre-requisites

1. Just make sure that [**docker**](https://www.docker.com/get-started/) is installed your system by typing the command ```docker -v``` on your command line

2. Also you require [**Git**](https://git-scm.com/downloads) to be installed inorder to clone the repository

### Steps

1. Clone the repository and navigate to the frontend

```shell
git clone https://github.com/ramya487/typescript
cd typescript
```

2. Set up environment variables

Create a ```.env``` file. Refer to the file `.env.mock` to configure the environment variables required for the project

3. To build docker image for development and start the container execute

```shell
docker build --target=dev -t chatv1-backend:dev .
docker run -d -p 8000:8000 --env-file .env  --name chatv1-backend-dev chatv1-backend:dev
```

5. Now you could access your backend via the url [```http://localhost:8000```](http://localhost:8000)

Please Note that, when using docker for development, it is required to add additional configuration to enable hot-reloading for iterative development and see the changes in real-time. Current docker configuration does not support this feature
