@echo off

rem Define the repositories to work on
set repositories=CarbonFootprint OpenStreetMap Productos Pujas Usuarios Cloudinary Mensajes

rem Obtén la ubicación del archivo de lote
set script_dir=%~dp0

rem Loop through the repositories in parallel
for %%r in (%repositories%) do (
    rem Change to the repository directory
    cd "%script_dir%%%r"

    rem Run npm install
    npm install

    rem Start nodemon app in a separate window
    start cmd /c npm start 
)

echo All processes have been started.
