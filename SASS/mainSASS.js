function getLocalStorage(){
    return JSON.parse(localStorage.getItem('DSND'))
}
var arrDSND = getLocalStorage();
var arrDSGV = arrDSND.filter(function(arrDSND){
    return arrDSND.loaiND === "GV"
})
console.log(arrDSGV)
function hienThiDSGV(arrDSGV){
    var content = ''
    arrDSGV.map(function(gv){
        content += `
        <div class="col-12 col-sm-6 col-lg-3 intro__box">
          <div class="intro__item card__teacher">
            <div class="intro__img">
              <img src="./img-sass/${gv.hinhAnh}" class="img-fluid" alt="">
            </div>
            <div class="intro__text">
              <div class="card__intro text-center p-2">
                <span>${gv.ngonNgu}</span>
                <br>
                <span>${gv.hoTen}</span>
                <p>${gv.moTa}</p>
              </div>
            </div>
          </div>
        </div>
        `
    })
    document.getElementById('rowSASS').innerHTML = content
}
hienThiDSGV(arrDSGV)