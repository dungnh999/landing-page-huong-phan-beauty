let isClick = 0;
let url = 'https://script.google.com/macros/s/AKfycbxFB3HwutXCFdJG0m440uNH6ZANVfGU3OXq7t78kLyhNBSfS-6mX8ZK3j3pCJJx1dCq/exec';
$(document).ready(function() {

    axios.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.interceptors.response.use((response) => {
        // trigger 'loading=false' event here
        console.log('Đã xong');
        return response;
    }, (error) => {
        // trigger 'loading=false' event here
        return Promise.reject(error);
    });

    $('#input-name-button').on('input',function(){
        $('#input-name-button').parent().find('label').addClass('d-none')
        $('#input-name-button').removeClass('error')
    })
    $('#input-phone-button').on('input',function(){
        $('#input-phone-button').parent().find('label').addClass('d-none')
        $('#input-phone-button').removeClass('error')
    })

    $('#input-name-modal').on('input',function(){
        $('#input-name-modal').parent().find('label').addClass('d-none')
        $('#input-name-modal').removeClass('error')
    })
    $('#input-phone-modal').on('input',function(){
        $('#input-phone-modal').parent().find('label').addClass('d-none')
        $('#input-phone-modal').removeClass('error')
    })


    $(window).scrollTop(0)



    $('#myFormUser').submit(function(e){
        e.preventDefault()
        sendData(e);
    })

    if(!localStorage.getItem('isShow')){
        setTimeout( function() {
            $('#main-modal').modal('show');
        }, 3000);
    }
});

function sendData(e){
    let flag = false;
    if(!$('#input-name-button').val().length){
        $('#input-name-button').addClass('error')
        $('#input-name-button').parent().find('label').text('Họ tên không được để trống');
        $('#input-name-button').parent().find('label').removeClass('d-none')
        flag = true;
    }

    if(!$('#input-phone-button').val().length){
        $('#input-phone-button').addClass('error')
        $('#input-phone-button').parent().find('label').text('Số điện không được để trống');
        $('#input-phone-button').parent().find('label').removeClass('d-none')
        flag = true;
    }

    if(!(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test($('#input-phone-button').val()))){
        $('#input-phone-button').addClass('error')
        $('#input-phone-button').parent().find('label').text('Số điện không hợp lệ');
        $('#input-phone-button').parent().find('label').removeClass('d-none')
        flag = true;
    }

    if(flag) return !flag;

    $('#myFormUser').find('button').text('.....')
    if(!isClick){
        isClick = 1;
        let form  = {
            name : $('#input-name-button').val(),
            phone : $('#input-phone-button').val(),
            box : $('#myFormUser').find('select option:selected').text()
        };

        let queryString = new URLSearchParams (form);
        $.ajax({
            url: url,
            type: "post",
            data: queryString.toString()
        }).then(function(response) {
            $('#myFormUser').find('input').val('')
            $('#myFormUser').find('button').text('NHẬN ƯU ĐÃI NGAY')
            // $('#main-sussces-modal').modal('show');
            Swal.fire({
                icon: "success",
                title: "Đăng ký thành công",
                showConfirmButton: false,
                timer: 1500
            });
            isClick = 0;
            $('#myFormUser').find('select option:disabled').prop('selected', true)
        }).catch(function(error) {
            alert('Lỗi')
        });
    }
}

function sendDataModal(e){
    let flag = false;
    if(!$('#input-name-modal').val().length){
        $('#input-name-modal').addClass('error')
        $('#input-name-modal').parent().find('label').text('Họ tên không được để trống');
        $('#input-name-modal').parent().find('label').removeClass('d-none')
        flag = true;
    }

    if(!$('#input-phone-modal').val().length){
        $('#input-phone-modal').addClass('error')
        $('#input-phone-modal').parent().find('label').text('Số điện không được để trống');
        $('#input-phone-modal').parent().find('label').removeClass('d-none')
        flag = true;
    }

    if(!(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test($('#input-phone-modal').val()))){
        $('#input-phone-modal').addClass('error')
        $('#input-phone-modal').parent().find('label').text('Số điện không hợp lệ');
        $('#input-phone-modal').parent().find('label').removeClass('d-none')
        flag = true;
    }

    if(flag) return !flag;

    $('#myFormUserModal').find('button').text('.....')
    if(!isClick){
        isClick = 1;
        let form  = {
            name : $('#input-name-modal').val(),
            phone : $('#input-phone-modal').val(),
            box : $('#myFormUserModal').find('select option:selected').text()
        };
        let queryString = new URLSearchParams (form);
        $.ajax({
            url: url,
            type: "post",
            data: queryString.toString()
        }).then(function(response) {
            $('#myFormUserModal').find('input').val('')
            $('#myFormUserModal').find('button').text('NHẬN ƯU ĐÃI NGAY')
            $('#main-sussces-modal').modal('show');
            Swal.fire({
                icon: "success",
                title: "Đăng ký thành công",
                showConfirmButton: false,
                timer: 1500
              });
            isClick = 0;
            $('#myFormUserModal').find('select option:disabled').prop('selected', true)
        }).catch(function(error) {
            alert('Lỗi')
        });
    }
}

function openModalForm(){
    $('#main-modal').modal('show');
}


function closeModalForm(){
    $('#main-modal').modal('hide');
    localStorage.setItem('isShow', 1)
}


function openLinkPage(){
    window.open('https://www.facebook.com/huongphanpmubeauty', '_blank');
}