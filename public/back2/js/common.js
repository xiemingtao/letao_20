

//
$(function () {
    // 菜单功能
  $('.icon_menu').click(function () {
      $('.lt_main').toggleClass('hideLeft');
      $('.lt_aside').toggleClass('hideLeft')
      $('.menu').toggleClass('hideLeft')
  })
  $('.category').click(function () {
      $('.child').stop().slideToggle()
  })
})