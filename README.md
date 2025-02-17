# Temitope Yusuff Mainstack Test

This repository contains the solution to the Mainstack test project developed by Temitope Yusuff. The project is implemented using TypeScript and is structured to provide a clear and organized codebase.

## Project Structure

The repository includes the following key files and directories:

- `src/`: Contains the source code of the application.
- `dist/`: The distribution directory where the compiled code resides.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `nodemon.json`: Configuration file for Nodemon to monitor and automatically restart the application during development.
- `package.json`: Lists the project's dependencies and scripts.
- `tsconfig.json`: Configuration file for the TypeScript compiler.

## Getting Started

To set up and run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tope-stack/Temitope-Yusuff-Mainstack-Test.git
   cd Temitope-Yusuff-Mainstack-Test

2. **Install Dependencies:**

   Ensure you have node installed. Then, install the project dependencies
   ```bash
   npm install
   
3. **Build The Project**

   Compile the TypeScript code into JavaScript
   ```bash
   npm run build
   
4. **Run The Application**
   Start the application using Nodemon for automatic restarts on code changes
   ```bash
   npm run dev
   
## Scripts
The package.json file defines several scripts for common tasks:
```json
{
  "scripts": {
    "build": "tsc",
    "dev": "nodemon src/index.ts",
    "start": "node dist/index.js"
  }
}
