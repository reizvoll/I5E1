const modal_2 = document.querySelector(".modalSecond");
const btnOpenModal_2 = document.querySelector(".btn-open-modalSecond");

btnOpenModal_2.addEventListener("click", () => {
  modal_2.style.display = "flex";
});

const closebtn = document.querySelector("#close")

closebtn.addEventListener("click", ()=>{
    modal_2.style.display = "none";
})
