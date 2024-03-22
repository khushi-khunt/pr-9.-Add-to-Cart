const product = [
    { id: 0, name: "PANIPURI", price: 20, quantity: 1, img: "assets/img/img1.webp" },
    { id: 1, name: "DHOSA", price: 120, quantity: 1, img: "assets/img/img2.webp" },
    { id: 2, name: "BURGER", price: 140, quantity: 1, img: "assets/img/img3.jpg" },
    { id: 3, name: "PIZZA", price: 150, quantity: 1, img: "assets/img/img4.jpg" },
    { id: 4, name: "VEG-CRISPY", price: 90, quantity: 1, img: "assets/img/img5.jpg" },
    { id: 5, name: "CHEESE-SANDWITCH", price: 80, quantity: 1, img: "assets/img/img6.jpg" },
    { id: 6, name: "CHILLI-PASTA", price: 160, quantity: 1, img: "assets/img/img7.jpg" },
    { id: 7, name: "NOODLES", price: 60, quantity: 1, img: "assets/img/img8.jpg" },
];

const viewproduct = () => {
    var tbl = "";

    product.map((val) => {
        return (
            tbl += `
            <div class="col-3 p-3">
            <div class="card">
               <div class="img">
               <p style = "display : none;">${val.id}</p>
                <img src="${val.img}" class="img-fluid" alt="">
               </div>
               <h3>${val.name}</h3>
               <span>RS.${val.price}</span>
               <button onclick ="addcart(${val.id})">
                <i class="fa-solid fa-cart-shopping"></i>
               </button>
            </div>
        </div>
        `
        )
    })
    document.getElementById("allItems").innerHTML = tbl;


}
viewproduct();

let cart = [];
const addcart = (id) => {
    let allcart = JSON.parse(localStorage.getItem('cart')) ? JSON   .parse(localStorage.getItem('cart')) : [];
    let duplicatecart = allcart.find((item) => {
        return item.id == id;
    })
    if (duplicatecart) {
        alert("item already exist......");
        return false;
    }
    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === undefined) {
        product.map((item) => {
            if (item.id == id) {
                cart.push(item);
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));

    } else {
        let old = JSON.parse(localStorage.getItem("cart"));
        product.map((item) => {
            if (item.id == id) {
                old.push(item);
            }
        })
        localStorage.setItem("cart", JSON.stringify(old));

    }
    alert("Product added....");
    viewproduct();
    viewcart();
}

const viewcart = () => {
    let allcart = JSON.parse(localStorage.getItem("cart"));
    let tbl = "";
    let sum = 0;
    allcart.map((val) => {
        sum = sum + (val.price * val.quantity);
        return (
            tbl += `
            <div class="col-12 d-flex justify-content-center align-items-center"  style = " border-top: 1px solid #333333; padding : 10px 0">
            <div class="col-4">
            <div style = "display:none;">${val.id}</div>
                <div class="img">
                    <img src="${val.img} " alt="">
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center" >
                <div class="title">
                    <h2>${val.name}</h2>
                    <p>RS.${val.price}</p>
                    <span ><input onchange="Editcart(${val.id}) " id="qty_${val.id}" style = "width : 50%; padding-left : 10px;" type = "number" value = "${val.quantity}" /></span>
                     </div>
            </div>
            <div class="col-4">
                <div class="iconD d-flex justify-content-center">
                    <p>RS.${val.price * val.quantity} </p>
                    <i onclick = "DeleteItem(${val.id})" class="fa-solid fa-trash"></i>
                   </div>
            </div>
        </div>
                    `
        )
    })
    document.getElementById("cartItem").innerHTML = tbl;
    document.getElementById("FOODTOTAL").innerHTML = `RS.${sum}`;

    let count = allcart.length;
    document.getElementById("counter").innerHTML = count;
    viewproduct();

}
viewcart();

const DeleteItem = (id) => {
    let allCarts = JSON.parse(localStorage.getItem("cart"));

    let Delete = allCarts.filter((val) => {
        return val.id != id;

    })
    localStorage.setItem("cart", JSON.stringify(Delete))

    alert("Items Deleted sucessfully...");
    viewcart();
}

const Editcart = (id) => {
    let quantity = document.getElementById(`qty_${id}`).value;
    let allcart = JSON.parse(localStorage.getItem(`cart`));

    allcart.map((item) => {
        if (item.id == id) {
            item.quantity = quantity;
        }
    })
    localStorage.setItem("cart", JSON.stringify(allcart));
    alert("item updated sucessfully...");
    viewcart();
}

