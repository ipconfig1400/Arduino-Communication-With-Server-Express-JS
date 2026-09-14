const message = document.querySelector("#message");
const temp = document.querySelector("#temp");
const portIn = document.querySelector("#port");
let led = 0;

document.querySelector("#open").addEventListener('click', async () => {
  console.log("Opening the port...");
  message.innerHTML = "Openning the port";
  
  setTimeout(async () => {
    message.innerHTML = "Port is opened";
    console.log("Port is opened");
    const response = await fetch('/openPort');
    const data = await response.json();
    portIn.value = data.port;
  }, 1000);
});

document.querySelector("#read").addEventListener('click', async () => {
  try {
    setInterval(async() => {
      const response = await fetch('/readPort');
      let data = await response.json();
      console.log(data);
      temp.value = data["value"] + "℃";

      //segment
      let segment_value = data["value"];
      let segment1 = Math.floor((segment_value / 1000));
      let segment2 = Math.floor((segment_value / 100) - (segment1 * 10));
      let segment3 = Math.floor((segment_value / 10) - ((segment1 * 100) + (segment2 * 10)));
      let segment4 = Math.floor((segment_value - (segment1 * 1000) - (segment2 * 100) - (segment3 * 10)));

      document.querySelector("#segment1").innerHTML = segment1;
      document.querySelector("#segment2").innerHTML = segment2;
      document.querySelector("#segment3").innerHTML = segment3;
      document.querySelector("#segment4").innerHTML = segment4;
      
    }, 100);
  } catch (error) {
    console.log("Error fetch: ", error);
  }
});

document.querySelector("#close").addEventListener('click', async () => {
  console.log("Closing the port...");
  message.innerHTML = "Closing the port..."
  setTimeout(async () => {
    console.log("Port is closed.");
    message.innerHTML = "Port is closed";
    const response = await fetch('/closePort');
    const data = await response.json();
  }, 1000);
  // setTimeout(() => {
  //   console.log("Exit...");
  //   message.innerHTML = "Exit...";
  // }, 1000);
})

document.querySelector("#led").addEventListener('click', async () => {
  const response = await fetch('/ledonoff');
  const data = await response.json();
  if(data.led == 0) {
    console.log("Open the port first!");
    message.innerHTML = "Open the port first!";
  } else if(data.led === "on") {
    console.log("LED On");
    message.innerHTML = "Led On";
  } else if(data.led === "off") {
    console.log("LED Off");
    message.innerHTML = "Led Off";
  }
  
});