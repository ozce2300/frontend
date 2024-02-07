"use strict";

const url = "https://dahlgren.miun.se/ramschema_ht23.php";
const tbodyEL = document.getElementById("tbody");
const reverseEL = document.getElementById("reverse");
const reverse1EL = document.getElementById("reverse1");
const reverse2EL = document.getElementById("reverse2");
const inputEL = document.getElementById("input")
let data = []

window.onload = init;

let sortDirection = {
    code: -1,       // Börja med fallande ordning för första klicket
    coursename: -1, // Börja med fallande ordning för första klicket
    progression: -1 // Börja med fallande ordning för första klicket
};

async function init() {
    try {
        const response = await fetch(url);
        data = await response.json();
        skola(data);

      
    } catch {
        document.getElementById("error").innerHTML += "<p>Funkar ej</p>";
    }
}

function skola(data) {
    tbodyEL.innerHTML = " ";

    data.forEach(enstaka => {
        tbodyEL.innerHTML += `<tr><td>${enstaka.code}</td><td>${enstaka.coursename}</td><td>${enstaka.progression}</td></tr>`;
    });
}

function reverseData(sortKey) {
    return async function () {
        try {
            const response = await fetch(url);
            const data = await response.json();

            sortDirection[sortKey] *= -1; // Byt riktning vid klick

            data.sort((a, b) => (a[sortKey] > b[sortKey]) ? sortDirection[sortKey] : -sortDirection[sortKey]);
            
            skola(data);
        } catch {
            document.getElementById("error").innerHTML += "<p>Funkar ej</p>";
        }
    };
}

inputEL.addEventListener("keyup", (e) => {
    const input = e.target.value.toLowerCase()
    let dataFiltered = data.filter((kurs) => {
     return kurs.code.toLowerCase().includes(input)|| kurs.progression.toLowerCase().includes(input) || kurs.coursename.toLowerCase().includes(input)
    })

     skola(dataFiltered)
} )

reverseEL.addEventListener("click", reverseData("code"));
reverse1EL.addEventListener("click", reverseData("coursename"));
reverse2EL.addEventListener("click", reverseData("progression"));

