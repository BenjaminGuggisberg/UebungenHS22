function uhr() {
    var date = new Date();
    var ds = date.toDateString();
    var ts = date.toTimeString();
    // var ds = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() 
    // var ts = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    var datum = document.querySelector("#date");
    var zeit = document.querySelector("#time");

    datum.innerHTML = ds;
    zeit.innerHTML = ts;

    setTimeout(uhr,500);
}


