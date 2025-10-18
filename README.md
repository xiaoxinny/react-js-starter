# React.js Starter

This template serves the purpose of making it simple for starting React.js based frontend applications. The language used here is **`Typescript`**.

Before beginning, the following command must be ran to create the React.js application:

```bash
npm create vite@latest
```

Follow through the instructions and choose the following options:

```txt
React
Typescript + SWC
```

Then, to test if it has been created successfully:

```bash
cd <app-name>
npm run dev
```

## Essential packages

Run the following command to install the packages below (make sure you have changed working directory to the newly created application):

- [Husky](https://typicode.github.io/husky/) (For pre-commit linting)
- [lint-staged](https://github.com/lint-staged/lint-staged) (For linting of staged files)
- [ESLint](https://eslint.org/) (Static code linting and debugging)
- [Prettier](https://prettier.io/) (Code formatting)
- [Tanstack Query](https://tanstack.com/query/latest) (Data fetching and state validation)

```bash
npm install --save-dev husky lint-staged prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-packagejson eslint-plugin-unicorn eslint-plugin-react eslint-plugin-n @tanstack/eslint-plugin-query

```

And also the following:

```bash
npm i @tanstack/react-query 
```

Afterwards, run the following commands:

```bash
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
```

Edit `package.json` to add these lines at the bottom of it:

```js
"scripts": {
    // Other codes here, replace if necessary
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx,.cjs",
    "lint:check": "eslint . --ext .ts,.tsx,.js,.jsx,.cjs --max-warnings=0",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
},
// Other codes here
"lint-staged": {
    "**/*.{ts,tsx,js,jsx,cjs,json,yml,yaml}": [
        "npm run format",
        "npm run format:check"
    ],
    "**/*.{ts,tsx,js,jsx,cjs}": [
        "npm run lint",
        "npm run lint:check"
    ]
}
```

Alternatively, there is another method to include the `lint-staged` configuration above, which is recommended for mono-repo projects that have different configurations across, or different programming languages.

Create a file called `.lintstagedrc.json` and add in the above. This assumes your structure resembles the following:

```txt
my-monorepo/
│── package.json          # root for Husky, lint-staged, etc.
│── .husky/
│── .lintstagedrc.json
│── packages/
│   ├── frontend/         # your Vite project lives here
│   └── backend/
```

The code from above will change slightly in this configuration:

```json
// package.json
"scripts": {
    // Other codes here, replace if necessary
    "lint:frontend": "npm --prefix packages/frontend run lint",
    "lint:frontend:check": "npm --prefix packages/frontend run lint:check",
    "format:frontend": "npm --prefix packages/frontend run format",
    "format:frontend:check": "npm --prefix packages/frontend run format:check",
    "lint:backend": "<code_for_linting_backend>",
    "format:backend": "<code_for_formatting_backend>"
}
```

Replace the `< >` parts with the relevant codes, according to the programming language.

```json
// .lintstagedrc.json
{
    "packages/frontend/**/*.{ts,tsx,js,jsx,cjs,yml,yaml}": [
        "npm run format:frontend",
        "npm run format:frontend:check",
        "npm run lint:frontend",
        "npm run lint:frontend:check"
    ],
    "packages/backend/**/*.py": [
        "npm run format:backend",
        "npm run lint:backend"
    ]
}
```

Ensure that within the `packages/frontend/package.json` file, you still have the codes from before for `lint`, `format`, etc.

You need not include the `lint-staged` codes as we have moved them to the root of the project.

Then, heres the tricky part - You have to compare the current files inside `config_files` with the newly created application files that have the same name, and copy the lines of code you want over.

Usually, copying over what is missing inside those files from the current files is sufficient, or the whole file if it does not exist.

Lastly, create a sub-folder under `src`  named `utils`,create a folder there named `react-query-client.ts`.
and paste the following code in:

```ts
import { QueryClient } from '@tanstack/react-query';

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
});
```

## Optional packages

These packages are great for quality of life, but may not be absolutely necessary.

### Packages

- [SWR](https://swr.vercel.app/) (For browser-based caching and efficient fetching of server data)
- [Storybook](https://storybook.js.org/) (For component-based previewing)

### Installation

#### `stale-while-revalidate` (SWR)

Run the following command to install the package:

```bash
npm i --save-dev swr
```

And you can now import it into respective pages for use!

```tsx
import useSWR from "swr";

function Profile({ userId }) {
  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return <div>hello {data.name}!</div>;
}
```

#### `Storybook`

Storybook takes a slightly different approach to installation.

After you have initiated your base project in your framework and language of choice, you can install it on top, and Storybook will automatically analyze and adapt your project to allow for it to render your components separately.

Run the following command to install the package:

```bash
# Make sure you are at the root of your project
npx storybook@latest init
```

Storybook will automatically open up its interface at <http://localhost:6006/>, which then you can visit for live preview and manipulation of the components you have created in the project.

## Additional configuration

### [Tailwind CSS (v4)](https://tailwindcss.com/docs/installation/using-vite)

This is for initializing the project with Tailwind CSS installed. Perform the below steps only after you have initialized the application using Vite and is in the root directory of the application.

#### Step 1 - Install the packages

Run the following command:

```bash
npm install tailwindcss @tailwindcss/vite
```

Then, we update the configuration file:

```js
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

And import Tailwind CSS into your CSS files that uses Tailwind:

```css
@import "tailwindcss";
```

Now you can use Tailwind with the application!

```tsx
export default function Home() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
```
