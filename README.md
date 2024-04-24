# Frontend Tech Assignment

This repository contains the frontend for the tech assignment built with Next.js and enhanced with Storybook for component visualization.

### Live Demo

[Demo](https://challenge-de-bijenkorf.vercel.app/)

## Project Setup

Ensure you have Node.js installed on your system to run this project.

### Installation

Clone the repository to your local machine and install the dependencies:

```bash
git clone git@github.com:sepehrnava/challenge-de-bijenkorf.git
cd challenge-de-bijenkorf
npm install
```

### Development

To start the development server, run:

```bash
npm run dev
```

This will start the Next.js development server at http://localhost:3000. The app will automatically reload if you change any of the source files.

### Build

To build the project for production, run:

```bash
npm run build
```

This will compile your application and get it ready for deployment.

### Start Production Server

After building the project, start the production server with:

```bash
npm run start
```

### Testing

This project uses Jest for testing. Run the tests with:

```bash
npm run test
```

To watch files for changes and re-run tests related to changed files, use:

```bash
npm run test:watch
```

### Storybook

To visualize and develop UI components interactively in isolation, you can use Storybook:

```bash
npm run storybook
```

This starts Storybook locally and outputs the address (typically http://localhost:6006) where you can view your components.

To build the static version of your storybook, use:

```bash
npm run build-storybook
```
