SnapStash allows users to upload images, search for them by file name, and delete them. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`].

## Getting Started

Add the .env file that was provided in my email (or email me at tai.hovanky@gmail.com about it) to the root of the project. While, the instructions said to keep installation limited to 2 commands, I know that uploading a .env file to GitHub is not recommended for security purposes. The server connects to a cloud hosted MySQL database and an AWS S3 bucket.

Install all packages using the "npm i" command.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- I went with a NextJS app for faster initial page loads, and because Next 13 allows for "server actions" (wihtout needed to create an "api" folder), it also reduced the amount of backend code that I would've needed. If I were to build a standard CRA app, I most likely would've needed a separate "server" and "client" folder and then would've needed to create a node/express server. NextJS also has optimizations for its Image component that would've been unavailable in a standard React app (prevents layout shifts on load, size optimizations, etc.).
- I used ShadCN components because ShadCN wouldn't require me to upload an entire component library - instead it let me import only the components that I needed, thus keeping this app lightweight.
- I used an older version of the AWS SDK for the sake of speed of development (since the backend isn't the focus of this project). This would explain the warning message in the console pertaining to AWS SDK version 3. However, given more time, I'd update the code to the latest version.
- If I had more time, I would add infinite scrolling for when the user has uploaded a lot of images. Rather than loading them all at once which would lead suboptimal for mobile users.
- Maybe I would add some more routes, such as one that lets a user view an image in full page mode. 
- I could also add some ability to download/save the image onto the user's device.
- I would also do more image optimizations to make the app more performant. Pagination/infinite scroll would be good for when the app has a lot more images.
