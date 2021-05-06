
I create this project by node js with postgresql.

How to run
1 - install pgadmin

2 - open new window for pgadmin

3 - create server
  - name : atechy_test
  - password : 483483
  - Host localhost

4 - ceate tow tables
  - user
    {
      first_name: { type: character varying },
      last_name: { type: character varying },
      email: { type: character varying },
      password: { type: character varying },
      role: { type: character varying },
      createdAt: { type: timestamp with time zone },
      updatedAt: { type: timestamp with time zone },
    }
  - support_ticket
    {
      id: { type: Integer },
      message: { type: character varying },
      userid: { type: Integer },
      createdAt: { type: timestamp with time zone },
      updatedAt: { type: timestamp with time zone },
    }

5 - download the code form github(https://github.com/ayman483/actechy_test)

6 - open the cmd in the project folder and run
  - yarn or npm install
  - node app.js 
 
7 - I reate collection for API in post man
  you can test all api from this API collection
  https://www.getpostman.com/collections/cb90965df7c9ec573fba
