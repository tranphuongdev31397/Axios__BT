function getEle(id) {
    return document.getElementById(id);
}
//Tạo đối tượng validation từ lớp đối tượng Validation
var validation = new Validation()
//Tạo đối tượng NguoiDungServices từ lớp đối tượng NguoiDungServices

var nguoiDungServices = new NguoiDungServices();
//Tao hàm lấy thông tin người dùng từ API
function layDanhSachND() {
    nguoiDungServices.layThongTinND()
        .then(function (result) {
            //renderTable
            renderTable(result.data)
            setLocalStorage(result.data)
            return result.data
        })
        .catch(function (err) {
            console.log('Rot mang')
        })
}
layDanhSachND();


function validator(taiKhoan,hoTen,matKhau,email,hinhAnh,loaiND, loaiNgonNgu,moTa) {
  
    var isValid = true;
    isValid &= validation.kiemTraRong(taiKhoan, 'tbTk', '(*) Tài khoản không được để trống')
            
    isValid &= validation.kiemTraRong(hoTen, 'tbHoTen', '(*) Họ tên không được để trống')
            && validation.kiemTraChuoi(hoTen, 'tbHoTen', '(*) Họ tên phải là dạng chuỗi, không có số hoặc kí tự đặc biệt')
    isValid &= validation.kiemTraRong(matKhau, 'tbpword', '(*) Mật khẩu không được để trống')
            && validation.kiemTraMatKhau(matKhau, 'tbpword', '(*) Mật khẩu phải đúng định dạng, có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8 ')
    isValid &= validation.kiemTraRong(email, 'tbEmail', '(*) Email không được bỏ trống')
            && validation.kiemTraEmail(email, 'tbEmail', '(*) Email phải đúng định dạng, Vd: abc@gmail.com')
    isValid &= validation.kiemTraRong(hinhAnh, 'tbHinhAnh', '(*) Hình ảnh không được để trống')
    isValid &= validation.kiemTraSelection(loaiND,'tbloaiND','(*) Vui lòng chọn loại người dùng')
    isValid &= validation.kiemTraSelection(loaiNgonNgu,'tbloaiNgonNgu','(*) Vui lòng chọn loại người dùng')
    isValid &= validation.kiemTraDoDaiChuoi(moTa,'tbMoTa','(*) Vui lòng điền không quá 60 kí tự', 60)
            && validation.kiemTraRong(moTa, 'tbMoTa', '(*) Mô tả không được để trống')
    return isValid
}


//Lấy thông tin người dùng mới
getEle('btnThemNguoiDung').addEventListener('click', function () {
    getEle('modal__form').reset();
    document.querySelector('.modal-footer').innerHTML = `<button type="button" class="btn btn-success" id="btnThem" onclick="layThongTinNDMoi()">Thêm người dùng</button>`
})
function layThongTinNDMoi() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var loaiNgonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

    var arrND = getLocalStorage();
    var isValidation = true
    isValidation = validation.kiemTraTrungKiTu(taiKhoan, 'tbTk', '(*) Tài khoản bị trùng, vui lòng chọn tài khoản khác', arrND)
    if (!isValidation) return
    var isValid = validator(taiKhoan,hoTen,matKhau,email,hinhAnh,loaiND,loaiNgonNgu,moTa)
    if (!isValid) return
    var nguoiDungMoi = new NguoiDung(taiKhoan, hoTen, matKhau, email, loaiND, loaiNgonNgu, moTa, hinhAnh)


    nguoiDungServices.themND(nguoiDungMoi)
        .then(function (result) {
            layDanhSachND()
        })
}
//Tạo hàm xóa ND 

function xoaND(id) {
    nguoiDungServices.xoaND(id)
        .then(function (result) {
            layDanhSachND();
        })
}
//Tạo hàm sửa ND
function suaND(id) {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var loaiNgonNgu = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

    if(!validator(taiKhoan,hoTen, matKhau,email, hinhAnh,loaiND,loaiNgonNgu,moTa)) return

    var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, loaiND, loaiNgonNgu, moTa, hinhAnh)

    nguoiDungServices.suaND(id, nd)
        .then(function (result) {
            layDanhSachND()
            document.querySelector('#myModal .close').click() 
        })
}
//Tạo hàm xem ND để đổ thông tin vào modal
function xemND(id) {
    nguoiDungServices.xemThongTinND(id)
        .then(function (result) {
            // getEle('btnThem').style.display = 'none'
            //Show modal 
            $('#myModal').modal('show')
            //Đổ thông tin vào modal
            getEle('TaiKhoan').value = result.data.taiKhoan
            getEle('HoTen').value = result.data.hoTen
            getEle('MatKhau').value = result.data.matKhau
            getEle('Email').value = result.data.email
            getEle('HinhAnh').value = result.data.hinhAnh
            getEle('loaiNguoiDung').value = result.data.loaiND
            getEle('loaiNgonNgu').value = result.data.ngonNgu
            getEle('MoTa').value = result.data.moTa
            //Tạo nút cập nhật người dùng
            var modalfooter = document.querySelector('.modal-footer');
            modalfooter.innerHTML = `<button class="btn btn-success" onclick="suaND('${result.data.id}')">Cập nhật sản phẩm</button>`
        })
}



//Tạo hàm renderTable 

function renderTable(mangND) {
    var content = '';
    mangND.map(function (objND, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${objND.taiKhoan}</td>
                <td>${objND.matKhau}</td>
                <td>${objND.hoTen}</td>
                <td>${objND.email}</td>
                <td>${objND.ngonNgu}</td>
                <td>${objND.loaiND}</td>
                <td>
                <button class="btn btn-success" onclick="xemND('${objND.id}')">Sửa</button>
                <button class="btn btn-danger" onclick="xoaND('${objND.id}')">Xóa</button>
                </td>
            </tr>
        `
    })

    getEle('tblDanhSachNguoiDung').innerHTML = content
}

//Tạo hàm lấy DSND để lấy mảng ND làm Vali
function setLocalStorage(arrND) {
    localStorage.setItem('DSND', JSON.stringify(arrND));
}
function getLocalStorage() {
    if (localStorage.getItem('DSND')) {
        return JSON.parse(localStorage.getItem('DSND'))
    }
}

var arrDSND = getLocalStorage();
console.log(arrDSND)
var arrDSGV = arrDSND.filter(function(arrDSND){
    return arrDSND.loaiND === "GV"
})
console.log(arrDSGV)