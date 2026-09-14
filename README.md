# Arduino-Communication-With-Server-Express-JS
Project at May 2025. My very first server project using Node js and Express js.
The goal is to controll arduino and reading serial data over the internet using web protocol. 
open folder and run "node server.js" inside your terminal.

To controll arduino:
1. Connect your arduino first.
2. Make sure to know which COM port your arduino is using. change the port inside "server.js", and run the file.
3. In terminal, you can see the link it provides. Open the link inside your browser.
4. Click "Open" to open the arduino port.
5. Button "Read" to read the data sent by your arduino.

Button "Close" to close the port and shut the communication down.
Button "LED", to controll the LED or your switch using arduino pin. (It connects with arduino serial and it can send serial write to your arduino. you can change to whatever message you want)
