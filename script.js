/* BACKGROUND SLIDER */

let slides=document.querySelectorAll(".slide")

let index=0

function changeSlide(){

slides[index].classList.remove("active")

index=(index+1)%slides.length

slides[index].classList.add("active")

}

setInterval(changeSlide,4000)

/* REGISTER */

function register(){

let name=document.getElementById("pname").value

let age=document.getElementById("page").value

let patient={name:name,age:age}

localStorage.setItem("patient",JSON.stringify(patient))

document.getElementById("regmsg").innerHTML="Patient Registered Successfully"

}

/* APPOINTMENT */

function book(){

let name=document.getElementById("aname").value

let doctor=document.getElementById("doctor").value

let date=document.getElementById("date").value

let appointment={name:name,doctor:doctor,date:date}

localStorage.setItem("appointment",JSON.stringify(appointment))

document.getElementById("msg").innerHTML="Appointment Booked Successfully"

}
