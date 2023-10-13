SnapStash allows users to upload images, search for them by file name, and delete them. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`].

## Getting Started

Install all packages using the "npm i" command.

Then, run the development server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to run a production build, do "npm run build" and change the "start" script in package.json to "next start".

## Notes

- I went with a NextJS app for faster initial page loads, and because Next 13 allows for "server actions" (wihtout needed to create an "api" folder), it also reduced the amount of backend code that I would've needed. If I were to build a standard CRA app, I most likely would've needed a separate "server" and "client" folder and then would've needed to create a node/express server. NextJS also has optimizations for its Image component that would've been unavailable in a standard React app (prevents layout shifts on load, size optimizations, etc.).
- Normally, I would never upload the .env up to GitHub (security risk), but I wanted the person evaluating this to be able to run the project without downloading anything to their device (as per the instructions). The database instance and S3 bucket (and AWS account) were made specifically for this project. Once the evaluation period ends, I'll change out the instances and credentials.
- I used ShadCN components because ShadCN wouldn't require me to upload an entire component library - instead it let me import only the components that I needed, thus keeping this app lightweight.
- I used an older version of the AWS SDK for the sake of speed of development (since the backend isn't the focus of this project). This would explain the warning message in the console pertaining to AWS SDK version 3. However, given more time, I'd update the code to the latest version.

## Time spent
It took about 5-6 hours to get the basic functionality working (on Wednesday evening). Then I spent probably a total of 6 hours on Thursday just doing code clean up/refinement. On Friday morning, I spent 2 hours experimenting with infinite scroll.

## To Do (if I had more time)
- If I had more time, I would add infinite scrolling for when the user has uploaded a lot of images. Rather than loading them all at once which would lead suboptimal load times for mobile users. I did start experimenting with it on a separate branch, and managed to get more images to load on scroll, but ran out of time to work on uploading/deleting images within the new setup.
- Maybe I would add some more routes, such as one that lets a user view an image in full page mode. 
- I could also add some ability to download/save the image onto the user's device.
