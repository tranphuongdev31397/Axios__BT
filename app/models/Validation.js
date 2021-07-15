function Validation() {

    //Phương thức kiểm tra rỗng
    this.kiemTraRong = function (value, spanId, mess) {
        if (!value) {
            getEle(spanId).innerHTML = mess;
            getEle(spanId).style.display = 'block';
            return false
        }
        getEle(spanId).innerHTML = '';
        getEle(spanId).style.display = 'none';
        return true
    }
    //Phương thức kiểm tra kí tự trùng
    this.kiemTraTrungKiTu = function (value, spanId, mess, arrND) {
        for (var i = 0; i< arrND.length; i++) {
            if (value === arrND[i].taiKhoan) {
                getEle(spanId).innerHTML = mess;
                getEle(spanId).style.display = 'block';
                return false
            }
          
        }
        getEle(spanId).innerHTML = '';
        getEle(spanId).style.display = 'none';
        return true
    }
    //Phương thức kiểm tra chuỗi kí tự (không chứa số, và ký tự đặt biệt)
    this.kiemTraChuoi = function (value,spanId,mess){
        var patern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")
        if(patern.test(value)){
            getEle(spanId).innerHTML = '';
                getEle(spanId).style.display = 'none';
                return true
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = 'block';
        return false
    }
    //Phương thức kiểm mật khẩu : có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8
    this.kiemTraMatKhau = function (value,spanId,mess){
        var patern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$")
        if(patern.test(value)){
            getEle(spanId).innerHTML = '';
                getEle(spanId).style.display = 'none';
                return true
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = 'block';
        return false
    }
    //Phương thức kiểm tra Email
    this.kiemTraEmail = function (value,spanId,mess){
        var patern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        if(patern.test(value)){
            getEle(spanId).innerHTML = '';
            getEle(spanId).style.display = 'none';
            return true
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = 'block';
        return false
    }
    this.kiemTraSelection = function (value, spanId, mess){
        if(value === '0'){
            getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = 'block';
        return false
        }
        getEle(spanId).innerHTML = '';
            getEle(spanId).style.display = 'none';
            return true
    }
    this.kiemTraDoDaiChuoi = function (value,spanId,mess,max){
        if(value.length <= max){
            getEle(spanId).innerHTML = '';
            getEle(spanId).style.display = 'none';
            return true
        }
        getEle(spanId).innerHTML = mess;
        getEle(spanId).style.display = 'block';
        return false
    }
}