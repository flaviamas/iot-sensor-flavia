const linear_acceleration = new LinearAccelerationSensor({
  frequency: 1,
});
linear_acceleration.start();
linear_acceleration.onreading = () => {
  let x = Number(linear_acceleration.x.toFixed(5));
  let y = Number(linear_acceleration.y.toFixed(5));
  let z = Number(linear_acceleration.z.toFixed(5));
  document.getElementById("x").innerHTML = x;
  document.getElementById("y").innerHTML = y;
  document.getElementById("z").innerHTML = z;
  let status = Math.sqrt(x * x + y * y + z * z);
  if (status > 0.5) status = "Moving";
  else status = "Still";
  document.getElementById("status").innerHTML = status;
  let telemetry = { x: x, y: y, z: z, moving: status };

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(telemetry),
  });
};

linear_acceleration.onerror = (event) => {
  console.log(event.error.name, event.error.message);
  document.getElementById("errorname").innerHTML =
    "Error name: " + event.error.name;
  document.getElementById("errormex").innerHTML =
    "Error Message: " + event.error.message;
};
