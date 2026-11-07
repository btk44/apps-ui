# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.0 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" --install npm apps-ui
```

## Developing

Copy `.env.example` to `.env` and fill in the database connection secrets (`DATABASE_URL`, `DATABASE_KEY`). They are read server-side in `src/lib/server/database.server.ts`.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Creating activities

The activity form saves directly to the existing Supabase `activities` table. Enter a name
and select a location on the map; other fields are optional. If both dates are supplied,
the end date must not precede the start date. New records use type `activity` and are active.

The database must provide the PostGIS geography column and defaults for `id`, `version`,
`created_at`, and `updated_at`, matching the Python activity schema. The configured database
role needs insert access and select access to the returned metadata.
Categories and target groups are hidden in the creation form until their persistence is implemented.

Run the activity creation checks with Node's built-in test runner:

```sh
node --test tests/activity-creation.test.js
```

These checks use a local Supabase HTTP stub; they do not write to the configured database.

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
