# ToDo-List

Responsive web app with React.js, TypeScript and .Net

# How to run

- Make sure you have SSMS installed (you can always refer to [here](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16) if you need to install it)
- Clone the repo locally
- Open the `ToDoTime.sln` in visual studio, go to your Package console manager, run `Update-Database` command, it should create all the required DB tables
- Execute the project `ToDoTime`
- In VS code(or your prefered IDE), go to ClientApp folder under `` and run `yarn`, followed by `yarn start`
- Now you should have your backend running, and the frontend on port 3000
- In your browser go to `localhost:3000` if everything was setup properly you should see the app running


Any issues running, please contact me!
If curious about the EntityFramework Code first used in this project you can check a full post about it I did in [here](https://github.com/gaschneider/useful-stuff/blob/main/setup-backend-code-first.md)
