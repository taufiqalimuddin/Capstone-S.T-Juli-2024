document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Ice Coffee 18", img: "ice coffee 18.jpg", price: 25000 },
      {
        id: 2,
        name: "Ice Coffee Gula Aren",
        img: "ice coffee gula aren.jpg",
        price: 25000,
      },
      {
        id: 3,
        name: "Newyork Cheese Cake",
        img: "newyork cheese cake.jpg",
        price: 38000,
      },
      {
        id: 4,
        name: "Pizza Meat Lovers",
        img: "pizza meat lovers.jpg",
        price: 60000,
      },
      {
        id: 5,
        name: "Nasi Goreng Special 18 Coffee",
        img: "nasi goreng special 18 coffee.jpg",
        price: 30000,
      },
    ],
  }));
});
