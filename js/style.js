//todo: scroll-vehicle
$('.vehicle-type').mCustomScrollbar({
    theme: 'inset-3'
});

//todo: sử dụng thư viện scrollbar để khi ấn, thanh scroll sẽ trượt tới sản phẩm muốn tìm kiếm
//todo: đầu tiên sẽ viết hàm trượt xuống nơi đó (sẽ là 1 id)
function move(address) {
    $('.vehicle-type').mCustomScrollbar("scrollTo", address, { //* scroll tại class .vehicle-content trong thư viện mCustomScrollbar sẽ dùng lệnh "scrollTo" trượt tới vị trí address
        scrollEasing: 'easeOut'     //* kiểu trượt là easeOut
    });
}

$('.vehicle-nav ul li').click(function () {     //* Tạo sự kiện click tại phần nav là thẻ li trong thẻ cha là .vehicle-nav
    switch ($(this).attr('id')) {   //* con trỏ khi click là this, lấy được giá trị id attr('id') tại thẻ bị click
        case "sedan":   //* nếu giá trị id đó bằng với sedan 
            move("#sedanScroll");       //* thì cho thanh trỏ chạy xuống id #sedanScroll 
            break;
        case "suv":
            move("#suvScroll");
            break;
        default:
            move("#truckScroll");
            break;
    }

});



//todo: Tạo sự kiện active khi ấn vào vehicle và thoát vehicle-nav
let count = "";
$('#header .navbar .navbar_left a').click(function () {
    if (count === "") {   //* Nếu đây là lần nhất đầu tiên thì thực hiện if
        count = $(this).attr('id');

        $(this).addClass('active');


        //todo: lúc đầu vehicle sẽ có class hide-vehicle sẽ làm ẩn đi, muốn hiện lên sau khi click thì xóa class đó sau khi ấn vào phần vehicle
        if ($(this).attr('id') === "vehicles") {
            //todo: ANIMATE
            //* Hiện hiệu ứng vehicle trong lần nhấp đầu tiên
            $('.vehicle-nav').addClass('animate__fadeInDown');
            $('.vehicle-content').addClass('animate__fadeInUp');

            $('#vehicle-navbar').removeClass('hide-vehicle');
        }

    }
    else {           //* Các lần click tiếp theo
        if (count === $(this).attr('id')) {   //* click tiếp theo vào chính nút đó, Nếu count vẫn trùng với id của lần click trước đó, thì remove active đi

            $(this).removeClass('active');

            //todo: ANIMATE
            //* Nếu trong lần ấn thứ 2 trùng với nút đầu tiên thì xóa class trước đó và tạo hiệu ứng ẩn đi , sau khi delay vehicle ẩn đi thì xóa luôn 2 hiệu ứng fadeout 
            $('.vehicle-nav').addClass('animate__fadeOutUp');
            $('.vehicle-content').addClass('animate__fadeOutDown');
            setTimeout(function () {    //* sử dụng setTimeOut để delay cho đồng bộ với hiệu ứng animate, nghĩa là hiệu ứng chạy rồi thì mới chạy ẩn đi phần vehicle, nếu không thì hiệu ứng chưa kịp chạy thì phần vehicle bị mất đi trước

                //todo: gán lại class hide-vehicle nếu click vào vị trí đó lần thứ 2
                $('#vehicle-navbar').addClass('hide-vehicle');
                $('.vehicle-nav').removeClass('animate__fadeOutUp');
                $('.vehicle-content').removeClass('animate__fadeOutDown');
            }, 300);

            count = "";     //* gán count bằng rỗng để hết 1 vòng chạy sẽ thoát else và lên if ở trên, bắt đầu lại 1 lần nhấn mới

        }
        else {      //* các lần click tiếp theo khác nút trước đó
            $('#header .navbar .navbar_left a').removeClass('active');  //* clear hết class active ở thẻ tất cả thẻ a đã gán vào trước đó

            $(this).addClass('active'); //* add class active vào nút vừa ấn


            if ($(this).attr('id') !== "vehicles") {   //todo: nếu lần 2 mà ấn vào nút khác vehicle, thì ẩn phần vehicle bằng hiệu ứng fadeout và sau khi ẩn đi thì remove luôn fadeout

                $('.vehicle-nav').addClass('animate__fadeOutUp');
                $('.vehicle-content').addClass('animate__fadeOutDown');
                setTimeout(function () {
                    //todo: gán lại class hide-vehicle nếu click vào vị trí đó lần thứ 2
                    $('#vehicle-navbar').addClass('hide-vehicle');
                    $('.vehicle-nav').removeClass('animate__fadeOutUp');
                    $('.vehicle-content').removeClass('animate__fadeOutDown');
                }, 300);
            }
            else {   //todo: sau khi đã ấn nút khác để ẩn vehicle rồi, mà ấn lại vehicle thì hiện vehicle lên 
                //todo: ANIMATE
                $('#vehicle-navbar').removeClass('hide-vehicle');
            }
            count = $(this).attr('id');     //* gán lại id của nút vừa ấn cho count để sau khi chạy else, sẽ rơi lại vào vòng if phía trên
        }
    }
    console.log(count);
});

//todo: tạo sự kiện gắn active cho các danh mục vehicle-nav
$('#vehicle-navbar .vehicle-nav-content .vehicle-nav ul li').click(function () {
    $('#vehicle-navbar .vehicle-nav-content .vehicle-nav ul li').removeClass('active');      //* remove class active cũ đi
    $(this).addClass('active');  //* addclass active mới vào phần vừa ấn
});

//todo: Tạo hàm khi click vào 2 nút dismiss sẽ tắt vehicle 
$('.dismiss-left, .dismiss-right, .btn-collapse, .navbar-collapse').click(function () {
    $('.vehicle-nav').addClass('animate__fadeOutUp');
    $('.vehicle-content').addClass('animate__fadeOutDown');
    setTimeout(function () {
        //todo: gán lại class hide-vehicle nếu click vào vị trí đó lần thứ 2
        $('#vehicle-navbar').addClass('hide-vehicle');
        $('.vehicle-nav').removeClass('animate__fadeOutUp');
        $('.vehicle-content').removeClass('animate__fadeOutDown');
    }, 300);
    $('#header .navbar .navbar_left a').removeClass('active');
    count = "";
});

$('#carousel').ready(function () {
    // //todo: libary swiper slider
    const swiper = new Swiper('.mySwiper', {
        // Optional parameters
        // direction: 'vertical',
        loop: true,
        centeredSlides: true,


        //todo: If we need pagination(dấu chấm ở dưới)
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        // And if we need scrollbar
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    });
});

//todo: our-vehicle 
$('#our-vehicle-slide .our-carousel-content li').click(function(){
    //todo: xóa những thẻ có class active 
    $('#our-vehicle-slide .our-carousel-content li').removeClass('active');
    //todo: addclass active vào những thẻ được click
    $(this).addClass('active');
})