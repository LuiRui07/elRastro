@echo off

rem Define the repositories to work on
set repositories=CarbonFootprint OpenStreetMap Productos Pujas Usuarios Cloudinary

rem Loop through the repositories in parallel
for %%r in (%repositories%) do (
    rem Change to the repository directory
    cd C:\Users\steam\Documents\GitHub\elRastro\back\%%r

    rem Run npm install
    npm install

    rem Start nodemon app in a separate window
    start cmd /c nodemon app
)

echo All processes have been started.
