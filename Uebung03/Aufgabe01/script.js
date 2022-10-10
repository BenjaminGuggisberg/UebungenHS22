function farben() {
    var eing = document.querySelector("#src");
    var ausg = document.querySelector("#dst");
    var rand = Math.floor(Math.random()*16777215).toString(16);
    var farbe = "#" + rand;

    ausg.style.color = farbe;
    ausg.style.fontSize = "200px";
    ausg.innerHTML = eing.value;
}