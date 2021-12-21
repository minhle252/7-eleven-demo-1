var keyLocalStorageCartItems = "listCartItem";
//tạo đối tượng giỏ hàng
//input: idProduct, quantity
//output: cartItem
function createCartItem(idProduct, quantity) {
  var cartItem = new Object();
  cartItem.idProduct = idProduct;
  cartItem.quantity = quantity;
  return cartItem;
}
//lấy toàn bộ các item giỏ hàng được lưu trữ trong local Storage
function getListCartItem() {
  var listCartItems = new Array();
  // lấy chuỗi json lưu trữ trong local storage
  var jsonlistCartItems = localStorage.getItem(keyLocalStorageCartItems);
  // chuyển từ json qua danh sách giỏ hàng
  if (jsonlistCartItems != null) listCartItems = JSON.parse(jsonlistCartItems);
  return listCartItems;
}

// lưu trữ lại vào localstorage
function saveListCartItemInLocalStorage(listCartItems) {
  //chuyển thành chuỗi json
  var jsonlistCartItems = JSON.stringify(listCartItems);
  // lưu vào localstorage
  localStorage.setItem(keyLocalStorageCartItems, jsonlistCartItems);
}
