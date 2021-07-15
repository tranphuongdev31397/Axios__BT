function NguoiDungServices() {

    this.layThongTinND = function () {
        return axios({
            url: 'https://60ed6c15a78dc700178adeeb.mockapi.io/Users',
            method: 'GET',
        });
    }
    this.themND = function (nd) {
        return axios({
            url: 'https://60ed6c15a78dc700178adeeb.mockapi.io/Users',
            method: 'POST',
            data: nd,
        })
    }
    this.xoaND = function (id) {
        return axios({
            url: `https://60ed6c15a78dc700178adeeb.mockapi.io/Users/${id}`,
            method: 'DELETE',
        })
    }
    this.suaND = function(id,nd) {
        return axios({
            url: `https://60ed6c15a78dc700178adeeb.mockapi.io/Users/${id}`,
            method: 'PUT',
            data :nd,
        })
    }

    this.xemThongTinND =function (id){
        return axios({
            url: `https://60ed6c15a78dc700178adeeb.mockapi.io/Users/${id}`,
            method: 'GET',
        })
    }
}