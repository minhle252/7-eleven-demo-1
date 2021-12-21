//xây dựng hàm sinh ID tự động, output là chuỗi ID duy nhất
function createId() {
  var id = "";
  // lấy milisecond ở thời điểm hiện tại; 1s = 1000 milisecond
  id =
    Math.random().toString().substr(2, 10) + "_" + String(new Date().getTime());
  return id;
}
