// mô tả: để tạo ra đối tượng dựa vào các thuộc tính được truyền vào
// Input: các thuộc tính
// Output: một đối tượng

function createProducts(images, name, origin, sale, area, id) {
  var products = new Object();

  //gắn các thuộc tính cho đối tượng
  products.images = images;
  products.name = name;
  products.origin = origin;
  products.sale = sale;
  products.area = area;

  if (id != null) {
    products.id = id;
  } else {
    products.id = createId();
  }
  // function cho đối tượng
  products.calc = function () {
    //logic xử lý của function
    var price = this.origin * (1 - this.sale);
    return price;
  };
  // chuyển object về dạng chuỗi json
  products.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };
  // từ json chuyển thành object đầy đủ  các phương thức
  /// input: json
  // output: full object
  products.fromJson = function (json) {
    var fullObject = new Object();
    //chuyển json thành object
    var object = JSON.parse(json);
    // chuyển object thành full object có các function
    var fullObject = createProducts(
      object.images,
      object.name,
      object.origin,
      object.sale,
      object.area
    );

    return fullObject;
  };

  //chuyển một danh sách đối tượng, thành một đoạn HTML để hiển thị được danh sách sản phẩm ra màn hình
  // input: listProducts
  // output: HTML hiển thị listProducts
  products.fromJsonList = function (jsonListProducts) {
    var listFullProducts = new Array();
    var listProducts = JSON.parse(jsonListProducts);

    for (var i = 0; i < listProducts.length; i++) {
      var products = listProducts[i];
      var fullProducts = createProducts(
        products.images,
        products.name,
        products.origin,
        products.sale,
        products.area,
        products.id
      );
      listFullProducts[i] = fullProducts;
    }
    return listFullProducts;
  };

  return products;
}

// chuyển một danh sach đối tượng thành một đoạn HTML để hiển thị được danh sach sản phẩm ra màn hình
// input: listProduct
// output: HTML hiển thị listProduct
function changeListProductToHTML(listProducts) {
  var HTMLListProducts = '<div class="row">';
  for (var i = 0; i < listProducts.length; i++) {
    var products = listProducts[i];
    var HTMLProducts = changeProductToHTML(products);
    HTMLListProducts = HTMLListProducts + HTMLProducts;
  }

  HTMLListProducts = HTMLListProducts + "</div>";

  return HTMLListProducts;
}

function changeProductToHTML(products) {
  var HTML = "";
  HTML = '<div class="col-xl-3 col-md-4 col-5 p-3">';
  HTML += '<div class="card w-100">';
  HTML += '<div class="card-body">';
  HTML +=
    '<img class="img-fluid" src="./images/iphone/' +
    products.images +
    '" alt="Iphone"/>';
  HTML += '<div class="card-text">' + products.name + "</div>";
  HTML += '<div class="item-price">';
  HTML += '<span class="item-price-origin ">' + products.origin + " đ</span>";
  HTML += '<span class="item-price-sale mx-1">' + products.calc() + " đ</span>";
  HTML += "</div>";
  HTML +=
    "<button onclick=\"onClickAddToCart('" +
    products.id +
    '\')" class="btn mt-3 me-2">Đưa vào giỏ</button>';
  HTML += "</div>";
  HTML += "</div>";
  HTML += "</div>";
  return HTML;
}

// truy xuất đối tượng theo id
function accessObjectById(id) {
  // lấy danh sach toàn bộ đối tượng
  var jsonListProducts = localStorage.getItem("listProducts");
  var listProducts = JSON.parse(jsonListProducts);

  // duyệt toàn bộ đối tượng, kiểm tra xem id của đối tượng có bằng với id truyền vào không
  for (var i = 0; i < listProducts.length; i++) {
    var currentProduct = listProducts[i];
    if (currentProduct.id == id) {
      return currentProduct;
    }
  }
}
