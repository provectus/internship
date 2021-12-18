For downloading repository: \
`git clone https://github.com/Denisalik/internship/tree/frontend/internship` \
After that you need to cd(change directory) into exercise folder(`cd <name of downloaded folder>/frontend/exercise`)

Application can be run using docker(or docker-compose), port 80 is exposed by default(is uses nginx as server). \
To run application in detach mode run these commands: \
To build app: `docker-compose build` \
To run app: `docker-compose up -d` \
It uses localhost as url to request backend, so if you want to use docker instead of docker-compose, you need to change url to appropriate(change url in file `.env`, `host.docker.internal` is link to host(your machine), from container) or create docker network with other containers. You can check ports of other applications(backend and database) in docker-compose file. \
If you want to run app on your machine without docker you need to install nodejs and install dependencies i.e. `npm install` or `npm ci`, you can run development server using `npm start`.(if you want to use nginx - read Dockerfile fo instructions) \
For development I use node `v14.18.2`.

After starting application visit `localhost:3000`. \
There you should see list of all expenses(for deleting or editing expense you need to click on expense, for adding use + icon below). After adding expense it will pop up to the top, but if you re-enter the page(close and open again), this expense will at bottom(reason is expenses are sorted by id at backend). For convenience I added pagination for this list, you can click on icons with arrows to view another pages. Every form(both edit and add) has form validation for amount(should be more than 0) and description(should be non-empty), Amount is parsed to int. \
In another tab there graph with all statistics. You can navigate to it using link at the top of the page. There you can find plot with all expenses by month and by categories. Calculate function depend on expenses, so if you change expenses at first page, it will recalculate values. Colors are random.
