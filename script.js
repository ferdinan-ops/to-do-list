const list = document.querySelector(".list");

list.addEventListener("click", function (e) {
    e.target.classList.toggle('active')
    console.log(e.target);
})



const add = document.querySelector("button");

add.addEventListener("click", () => {
    const createList = document.createElement("label");
    let txt = document.getElementById("txt").value;
    createList.innerHTML = `<input type=checkbox id=check> ${txt}`;
    list.appendChild(createList);
    txt.innerHTML = "";
})