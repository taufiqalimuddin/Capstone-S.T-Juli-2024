document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Ice Coffee 18",
        img: "ice coffee 18.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 2,
        name: "Ice Coffee Gula Aren",
        img: "ice coffee gula aren.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 3,
        name: "Newyork Cheese Cake",
        img: "newyork cheese cake.jpg",
        price: 38000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 4,
        name: "Pizza Meat Lovers",
        img: "pizza meat lovers.jpg",
        price: 60000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 5,
        name: "Nasi Goreng Special 18 Coffee",
        img: "nasi goreng special 18 coffee.jpg",
        price: 30000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 6,
        name: "Rice Bowl Chicken Katsu",
        img: "ricebowl chicken katsu.jpg",
        price: 30000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 7,
        name: "Spaghetti Bolognese",
        img: "spaghetti bolognese.jpg",
        price: 30000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 8,
        name: "Chicken Cordon Blue French Fries",
        img: "chicken cordon bleu.jpg",
        price: 40000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 9,
        name: "Bakmi yamin Manis",
        img: "mie yamin manis.jpg",
        price: 30000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 10,
        name: "Tahu Lada Garam",
        img: "tahu lada garam.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 11,
        name: "Roti Bakar Special 18 Coffee",
        img: "roti bakar.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 12,
        name: "French Fries Sosis",
        img: "french fries sosis.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 13,
        name: "Cireng",
        img: "cireng.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 14,
        name: "Milkbase Chocolate",
        img: "milkbase chocholate.jpg",
        price: 25000,
        hasOptions: true,
        selectedOption: null,
      },
      {
        id: 15,
        name: "Milkblend Matcha Greentea (ice)",
        img: "milkband matcha.jpg",
        price: 25000,
        hasOptions: false,
        selectedOption: null,
      },
      {
        id: 16,
        name: "Teh Manis",
        img: "tea.jpg",
        price: 15000,
        hasOptions: true,
        selectedOption: null,
      },
      {
        id: 17,
        name: "Lemon Tea",
        img: "lemon tea.jpg",
        price: 20000,
        hasOptions: true,
        selectedOption: null,
      },
      {
        id: 18,
        name: "Americano",
        img: "americano.jpg",
        price: 22000,
        hasOptions: true,
        selectedOption: null,
      },
      {
        id: 19,
        name: "Vanilla Latte",
        img: "vanilla latte.jpg",
        price: 25000,
        hasOptions: true,
        selectedOption: null,
      },
      {
        id: 20,
        name: "Vanilla frappe (ice)",
        img: "vanilla frappe.jpg",
        price: 30000,
        hasOptions: false,
        selectedOption: null,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find(
        (item) =>
          item.id === newItem.id &&
          item.selectedOption === newItem.selectedOption
      );

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (
            item.id !== newItem.id ||
            item.selectedOption !== newItem.selectedOption
          ) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id, selectedOption) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find(
        (item) => item.id === id && item.selectedOption === selectedOption
      );

      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        //telusuri 1 1
        this.items = this.items.map((item) => {
          //jika bukan barang yang diklik
          if (item.id !== id && item.selectedOption === selectedOption) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika barangnya sisa 1
        this.items = this.items.filter(
          (item) => item.id !== id && item.selectedOption === selectedOption
        );
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation//
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.Disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.Disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data saat checkout diklik//
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open(
  //   `http://wa .me//6282191757050?text=` + encodeURIComponent(message)
  // );

  //minta transaction token menggunakan ajax/fetch //
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    // console.log(token);
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

//format pesan whatsapp//
const formatMessage = (obj) => {
  return `Data Customer 
  Nama: ${obj.name}
  Email: ${obj.email}
  noHP: ${obj.phone}
Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) =>
      `${item.name} ${item.selectedOption ? `(${item.selectedOption})` : ""} (${
        item.quantity
      } x ${rupiah(item.total)}) \n`
  )}
TOTAL: ${rupiah(obj.total)}
 Terima Kasih `;
};

// Konversi ke Rupiah //
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
