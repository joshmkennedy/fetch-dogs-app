# Puppy Fetch

This is a SvelteKit app that fetches puppies from the Dog API.

## Fetch Frontend Take-Home Exercise

Hey there 👋. Thanks for checking out my take-home exercise for the Fetch Frontend role. Heres how I did it.

I used SvelteKit and Tailwind to build this app. I used the shadcn-ui component library to make the UI look nice. Im storing state in the urls so that different breeds and location filter settings can be shared by sharing the url. Im also Storing your settings in localstorage and cookies so that users don't have to re-enter their information.

If I continued to work on this project I would clean up the api.ts file and make
those functions more reusable. I would also like to add testing with playwright.
I'd also like to add more subtle animations to the puppy grid.

## Run this project

1. Clone this repo

```bash
git clone https://github.com/joshkennedy/fetch-dogs-app.git
```

2. cd into the directory

```bash
cd fetch-dogs-app
```

3. Install dependencies

```bash
npm install
```

4. Create a .env file

```bash
echo "PUBLIC_API=\"https://frontend-take-home-service.fetch.com\"" > .env
```

5. Run the app

```bash
npm run build && npm run preview
```

6. Give Josh a high five 👋 and maybe an interview 😎.
