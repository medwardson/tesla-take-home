# Tesla Take Home Challenge

## Problem Statement

Given a predefined list of batteries, their cost, size, and capacity, demonstrate to a potenital customer what their costs, land requirements, and energy will be for a given selection of batteries.

## Design Decisions

-   I considered using either NextJS + NextAPI or ExpressJS to serve the data. I decided against it because the data set is extremely small and can be easily managed in the front end.
-   Used Typescript to ensure type safety and to make the code more readable.
-   I was not able to find specific photos of the batteries, so I opted against including images. If they were to be added, I would have added an info option on the deviceSelectors that would open a modal with the image of the battery.
-   I used more so javascript logic to do the grid rather than CSS grid. This was because I wanted to choose the order of batteries more specifically to fit better into the grid.
-   I opted not to display the device year because it was not relevant to the problem. It can be easily added into the deviceSelector component as the data is there.
-   I considered adding redux to simplify some of the handoff of data but it felt like overkill for the size of the project.

It was a pretty enjoyable project overall, thanks for the opportunity!

In order to run the code, run the following command in the terminal:

```bash
npm install
npm run start
```
