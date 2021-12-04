var accessKey = "5353514789844343379";
var cssFontAwe = document.createElement('LINK');
cssFontAwe.setAttribute("rel","stylesheet");
cssFontAwe.setAttribute("src","//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css");
var cssVoucher = document.createElement('LINK');
cssVoucher.setAttribute("rel","stylesheet");
cssVoucher.setAttribute("src","https://static.accesstrade.vn/coupon/v2/css/css-voucher_at_v2.css");
var cssBoostrap = document.createElement('LINK');
cssBoostrap.setAttribute("rel","stylesheet");
cssBoostrap.setAttribute("src","https://static.accesstrade.vn/coupon/v2/css/bootstrap.min.css");
var cssSlick = document.createElement('LINK');
cssSlick.setAttribute("rel","stylesheet");
cssSlick.setAttribute("src","https://static.accesstrade.vn/coupon/v2/js/slick/slick.css");
var cssSlickTheme = document.createElement('LINK');
cssSlickTheme.setAttribute("rel","stylesheet");
cssSlickTheme.setAttribute("src","https://static.accesstrade.vn/coupon/v2/js/slick/slick-theme.css");
var head = document.head;
head.appendChild(cssFontAwe);
head.appendChild(cssVoucher);
head.appendChild(cssBoostrap);
head.appendChild(cssSlick);
head.appendChild(cssSlickTheme);

var jsJquery = document.createElement('SCRIPT');
jsJquery.setAttribute("type","text/javascript");
jsJquery.setAttribute("src","//static.accesstrade.vn/coupon/v2/js/jquery-1.11.1.min.js");
var jsPopper = document.createElement('SCRIPT');
jsPopper.setAttribute("type","text/javascript");
jsPopper.setAttribute("src","//static.accesstrade.vn/coupon/v2/js/popper.min.js");
var jsBoostrap = document.createElement('SCRIPT');
jsBoostrap.setAttribute("type","text/javascript");
jsBoostrap.setAttribute("src","//static.accesstrade.vn/coupon/v2/js/bootstrap.min.js");
var jsSlick = document.createElement('SCRIPT');
jsSlick.setAttribute("type","text/javascript");
jsSlick.setAttribute("src","//static.accesstrade.vn/coupon/v2/js/slick/slick.min.js");
var jsVoucher = document.createElement('SCRIPT');
jsVoucher.setAttribute("type","text/javascript");
jsVoucher.setAttribute("src","//static.accesstrade.vn/coupon/v2/js/main_at_v2.js");
jsVoucher.setAttribute("data-filters", `
{"merchant":"4742147753565840242,4348611690224153209,5127139956446111602,4348611682079477428","category":"","campaign":"4751584435713464237,4348614231480407268,5127144557053758578,4348614229221512955,"}
`); 
jsVoucher.setAttribute("data-accesskey", accessKey);
var body = document.body;
body.appendChild(jsJquery);
body.appendChild(jsPopper);
body.appendChild(jsBoostrap);
body.appendChild(jsSlick);
body.appendChild(jsVoucher);

var mainDivInner = `
<div id="layout-wrapper">
      <main class="atEQPOIVFSDFSDG-voucher-main">
        <div class="container">
          <div class='atEQPOIVFSDFSDG-search'>
            <div class='atEQPOIVFSDFSDG-filter-keyword'>
                <ul class='atEQPOIVFSDFSDG-tags'>
                </ul>
            </div>
            <div class='atEQPOIVFSDFSDG-input-main-search'>
              <div class='atEQPOIVFSDFSDG-input-search'>
                <input class="form-control" id="atEQPOIVFSDFSDG-search" placeholder="Nhập link sản phẩm, tên nhãn hàng, tên sản phẩm để tìm kiếm" type="text" value="">
                <span class='atEQPOIVFSDFSDG-search-clear'>
                  <i class="fas fa-times-circle" aria-hidden="true"></i>
                </span>
              </div>
              <button class='atEQPOIVFSDFSDG-btn-search'>
                <label class='atEQPOIVFSDFSDG-label-search'>Tìm kiếm</label>
                <span class='atEQPOIVFSDFSDG-icon-search'><i class="fas fa-search"></i></span>
              </button>
            </div>
          </div>
          <div class="atEQPOIVFSDFSDG-voucher-dealhot">
              <div class="atEQPOIVFSDFSDG-title-filter">
                  <div class="atEQPOIVFSDFSDG-title-total">
                      <img src="https://static.accesstrade.vn/coupon/v2/images/icon-coupon.svg" alt="">
                      <div class="atEQPOIVFSDFSDG-dealhot-title">
                          <h2 class="atEQPOIVFSDFSDG-title">Deal Hot</h2>
                      </div>
                  </div>
              </div>
              <div class="atEQPOIVFSDFSDG-dealitem-body">
              </div>
           </div>
          <div class='atEQPOIVFSDFSDG-voucher-dealcoupon'>
            <div class='atEQPOIVFSDFSDG-title-tabs'>
              <div class='atEQPOIVFSDFSDG-title'>
                <span style='margin-right:8px;'>
                  <img src="https://static.accesstrade.vn/coupon/v2/images/Vector.png">
                </span>
                <div class="atEQPOIVFSDFSDG-dealcouponlist-title">
                  <div class="atEQPOIVFSDFSDG-list-title">
                    <h4>DANH SÁCH COUPON</h4>
                    <button class='atEQPOIVFSDFSDG-delete-search' style="">
                    <span style='margin-right:8px;'>
                      <img src="https://static.accesstrade.vn/coupon/v2/images/arrow-left.png">
                    </span>
                    <span style='color:red; font-weight: bold;'>Hủy tìm kiếm</span>
                  </button>
                </div>
                </div>
              </div>
              <div class='atEQPOIVFSDFSDG-title-tabslist'>
                <ul class="nav nav-tabs" id="tabsdeal--link" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="history-tabs" data-toggle="tab" href="#deal-opening" style="font-weight: bold;"  role="tab">Đang mở <em></em></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="record-tabs" data-toggle="tab" href="#deal-soon" style="font-weight: bold;" role="tab">Sắp mở <em></em></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class='atEQPOIVFSDFSDG-filters-and-delete-search'>
              <div class="atEQPOIVFSDFSDG-at-filters">
                <div class="dropdown atEQPOIVFSDFSDG-filter-sort">
                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>Mới nhất</span>
                        <i class="icon-down"><img src="https://static.accesstrade.vn/coupon/v2/images/icon-caret.svg" alt=""></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownMenuSort">
                        <a class="dropdown-item" data-sort="0" href="#" style="display: none">Mới nhất</a>
                        <a class="dropdown-item" data-sort="4" href="#">Deal hot</a>
                        <a class="dropdown-item" data-sort="2" href="#">Dùng nhiều</a>
                        <a class="dropdown-item" data-sort="3" href="#">Thời gian còn lại</a>
                    </div>
                </div>
                <div class="dropdown atEQPOIVFSDFSDG-filter-sort">
                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>Tất cả nhà cung cấp</span>
                        <i class="icon-down"><img src="https://static.accesstrade.vn/coupon/v2/images/icon-caret.svg" alt=""></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownMenuMerchant" style="">
                    </div>
                </div>
              </div>
              <button class='atEQPOIVFSDFSDG-delete-search'>
                <span style='margin-right:8px;'>
                  <img src="https://static.accesstrade.vn/coupon/v2/images/arrow-left.png">
                </span>
                <span style='color:red; font-weight: bold;'>Hủy tìm kiếm</span>
              </button>
            </div>
            <div class="tab-content" id="tabsdeal--content">
                <div class="tab-pane fade show active" id="deal-opening" role="tabpanel">
                    <div id="no-coupon-link" style="display: none;text-align: center;padding: 1em;">
                        <h4>Đang cập nhật</h4>
                    </div>
                    <div class='atEQPOIVFSDFSDG-dealpromo-body'>
                    </div>
                    <div class="atEQPOIVFSDFSDG-coupon-pagination">
                      <nav>
                        <ul class="pagination" name='pagination'>
                          <li class="page-item" style="display: none">
                            <a onclick="prev(event,1)" class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-double-left"></i></a>
                          </li>
                          <li class="page-item" style="display: none">
                            <a onclick="prev(event)" class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a>
                          </li>
                          <li  class="page-item" style="display: none">
                            <a onclick="prev(event)" class="page-link" id="prev-page-active" href="#"></a>
                          </li>
                          <li class="page-item active">
                            <a class="page-link" href="#"><span class="sr-only"></span>1</a>
                          </li>
                          <li class="page-item" style="display: none" >
                            <a onclick="next(event)" class="page-link" id="next-page-active" href="#"></a>
                          </li>
                          <li class="page-item" style="display: none">
                            <a onclick="next(event)" class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-right"></i></a>
                          </li>
                          <li class="page-item" style="display: none">
                            <a  class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-double-right"></i></a>
                          </li>
                        </ul>
                      </nav>
                      <div class="page-box">
                        <span class="p-0" style="display: none"> <input class="page-selected" type="text"></span>
                        <span class="text-muted" name="text-muted">Trên  trang</span>
                      </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="deal-soon" role="tabpanel">
                    <div id="no-coupon" style="display: none;text-align: center;padding: 1em;">
                        <h4>Đang cập nhật</h4>
                    </div>
                    <div class='atEQPOIVFSDFSDG-dealpromo-body'>
                    </div>
                    <div class="atEQPOIVFSDFSDG-coupon-pagination">
                        <nav>
                            <ul class="pagination" name="pagination-soon">
                                <li class="page-item" style="display: none">
                                    <a onclick="prev(event,1,true)" class="page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-double-left"></i></a>
                                </li>
                                <li class="page-item" style="display: none">
                                    <a onclick="prev(event,null,true)" class="page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-left"></i></a>
                                </li>
                                <li class="page-item" style="display: none">
                                    <a onclick="prev(event,null,true)" class="page-link" id="prev-soon-page-active"
                                       href="#"></a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#"><span class="sr-only"></span>1</a>
                                </li>
                                <li class="page-item" style="display: none">
                                    <a onclick="next(event,null,true)" class="page-link" id="next-soon-page-active"
                                       href="#"></a>
                                </li>
                                <li class="page-item" style="display: none">
                                    <a onclick="next(event,null,true)" class="page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-right"></i></a>
                                </li>
                                <li class="page-item" style="display: none">
                                    <a class="page-link" href="#" tabindex="-1"><i
                                            class="fas fa-angle-double-right"></i></a>
                                </li>
                            </ul>
                        </nav>
                        <div class="page-box">
                         <span class="p-0" style="display: none">
                            <input class="page-selected" type="text">
                         </span>
                         <span class="text-muted" name="text-muted-soon">Trên trang</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </main>
      </div>
`;
