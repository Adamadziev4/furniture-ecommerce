const StoreItem = require("../../models/StoreItem");

const handleError = (res, err) => {
  res.status(500).send(err);
};

const getItems = (req, res) => {
  // const { id, category, color, limit, page, value = "" } = req.query;
  // const query = {};
  // if (id && id !== "undefined") query.id = id;
  // if (category && category !== "undefined") query.category = category;
  // if (color && color !== "undefined") query.color = color;
  // if (value && value !== "undefined") query.name = new RegExp(value, "i");
  // console.log("query", query);

  const { page, limit, price } = req.query;

  const queryParams = Object.assign({}, req.query);

  for (const param in queryParams) {
    if (!queryParams[param] || queryParams[param] === "undefined") {
      delete queryParams[param];
    } else if (param === "limit" || param === "page" || param === "price") {
      delete queryParams[param];
    } else {
      queryParams[param] = new RegExp(queryParams[param], "i");
    }
  }

  console.log("queryParams", queryParams);

  StoreItem.find(queryParams)
    .sort({ createdAt: -1 })
    .then((items) => {
      const filteredItems = items.filter((item) =>
        price ? item.price <= price : true
      );

      if (page && limit) {
        const limitedItems = filteredItems.slice(
          limit * (page - 1),
          limit * page
        );

        res.status(200).send({
          data: limitedItems,
          totalCount: filteredItems.length,
        });
      } else {
        const limitedItems = items.slice(0, limit);

        res.status(200).json({
          data: limitedItems,
          totalCount: filteredItems.length,
        });
      }
    })
    .catch((err) => handleError(res, err));
};

const addItems = (req, res) => {
  // const items = [
  //   {
  //     id: 1,
  //     name: "Simple armchair",
  //     category: "armchair",
  //     color: ["white", "red"],
  //     price: 249,
  //     imgUrl: "/img/items/armchairs/armchair-1.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Black armchair",
  //     category: "armchair",
  //     color: ["black"],
  //     price: 230,
  //     imgUrl: "/img/items/armchairs/armchair-2.jpeg",
  //   },
  //   {
  //     id: 3,
  //     name: "Computer armchair",
  //     category: "armchair",
  //     color: ["white"],
  //     price: 225,
  //     imgUrl: "/img/items/armchairs/armchair-3.png",
  //   },
  //   {
  //     id: 4,
  //     name: "Modern armchair",
  //     category: "armchair",
  //     color: ["white", "brown"],
  //     price: 310,
  //     imgUrl: "/img/items/armchairs/armchair-4.png",
  //   },
  //   {
  //     id: 5,
  //     name: "Low armchair",
  //     category: "armchair",
  //     color: ["white"],
  //     price: 300,
  //     imgUrl: "/img/items/armchairs/armchair-5.jpeg",
  //   },
  //   {
  //     id: 6,
  //     name: "Round armchair",
  //     category: "armchair",
  //     color: ["beige"],
  //     price: 260,
  //     imgUrl: "/img/items/armchairs/armchair-6.png",
  //   },
  //   {
  //     id: 7,
  //     name: "Big armchair",
  //     category: "armchair",
  //     color: ["white", "brown"],
  //     price: 390,
  //     imgUrl: "/img/items/armchairs/armchair-7.png",
  //   },
  //   {
  //     id: 8,
  //     name: "Armchair with patterns",
  //     category: "armchair",
  //     color: ["white", "black"],
  //     price: 410,
  //     imgUrl: "/img/items/armchairs/armchair-8.jpeg",
  //   },
  //   {
  //     id: 9,
  //     name: "Unusual armchair",
  //     category: "armchair",
  //     color: ["white"],
  //     price: 320,
  //     imgUrl: "/img/items/armchairs/armchair-9.png",
  //   },
  //   {
  //     id: 10,
  //     name: "Lounge armchair",
  //     category: "armchair",
  //     color: ["pink"],
  //     price: 190,
  //     imgUrl: "/img/items/armchairs/armchair-10.jpeg",
  //   },
  //   {
  //     id: 11,
  //     name: "Big green armchair",
  //     category: "armchair",
  //     color: ["green"],
  //     price: 325,
  //     imgUrl: "/img/items/armchairs/armchair-11.jpeg",
  //   },
  //   {
  //     id: 12,
  //     name: "Roal armchair",
  //     category: "armchair",
  //     color: ["white"],
  //     price: 340,
  //     imgUrl: "/img/items/armchairs/armchair-12.jpeg",
  //   },
  //   {
  //     id: 13,
  //     name: "Unusual chair",
  //     category: "chair",
  //     color: ["white", "brown"],
  //     price: 100,
  //     imgUrl: "/img/items/chairs/chair-1.jpeg",
  //   },
  //   {
  //     id: 14,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["brown"],
  //     price: 110,
  //     imgUrl: "/img/items/chairs/chair-2.jpeg",
  //   },
  //   {
  //     id: 15,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["white", "brown"],
  //     price: 130,
  //     imgUrl: "/img/items/chairs/chair-3.png",
  //   },
  //   {
  //     id: 16,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["white", "brown"],
  //     price: 90,
  //     imgUrl: "/img/items/chairs/chair-4.png",
  //   },
  //   {
  //     id: 17,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["grey", "brown"],
  //     price: 90,
  //     imgUrl: "/img/items/chairs/chair-5.png",
  //   },
  //   {
  //     id: 18,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["brown"],
  //     price: 90,
  //     imgUrl: "/img/items/chairs/chair-6.jpeg",
  //   },
  //   {
  //     id: 19,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["grey", "brown"],
  //     price: 90,
  //     imgUrl: "/img/items/chairs/chair-7.jpeg",
  //   },
  //   {
  //     id: 20,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["grey", "brown"],
  //     price: 90,
  //     imgUrl: "/img/items/chairs/chair-8.jpeg",
  //   },
  //   {
  //     id: 21,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["grey", "black"],
  //     price: 110,
  //     imgUrl: "/img/items/chairs/chair-9.jpeg",
  //   },
  //   {
  //     id: 22,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["brown"],
  //     price: 80,
  //     imgUrl: "/img/items/chairs/chair-10.jpeg",
  //   },
  //   {
  //     id: 23,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["white"],
  //     price: 160,
  //     imgUrl: "/img/items/chairs/chair-11.jpeg",
  //   },
  //   {
  //     id: 24,
  //     name: "Chair",
  //     category: "chair",
  //     color: ["beige"],
  //     price: 90,
  //     imgUrl: "/img/items/chairs/chair-12.jpeg",
  //   },
  //   {
  //     id: 25,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["beige"],
  //     price: 480,
  //     imgUrl: "/img/items/cupboards/cupboard-1.jpeg",
  //   },
  //   {
  //     id: 26,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["brown"],
  //     price: 520,
  //     imgUrl: "/img/items/cupboards/cupboard-2.jpeg",
  //   },
  //   {
  //     id: 27,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["black"],
  //     price: 535,
  //     imgUrl: "/img/items/cupboards/cupboard-3.jpeg",
  //   },
  //   {
  //     id: 28,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["beige"],
  //     price: 290,
  //     imgUrl: "/img/items/cupboards/cupboard-4.png",
  //   },
  //   {
  //     id: 29,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["brown"],
  //     price: 590,
  //     imgUrl: "/img/items/cupboards/cupboard-5.jpeg",
  //   },
  //   {
  //     id: 30,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["beige"],
  //     price: 620,
  //     imgUrl: "/img/items/cupboards/cupboard-6.jpeg",
  //   },
  //   {
  //     id: 31,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["brown"],
  //     price: 190,
  //     imgUrl: "/img/items/cupboards/cupboard-7.jpeg",
  //   },
  //   {
  //     id: 32,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["black"],
  //     price: 250,
  //     imgUrl: "/img/items/cupboards/cupboard-8.jpeg",
  //   },
  //   {
  //     id: 33,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["white"],
  //     price: 610,
  //     imgUrl: "/img/items/cupboards/cupboard-9.jpeg",
  //   },
  //   {
  //     id: 34,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["white"],
  //     price: 300,
  //     imgUrl: "/img/items/cupboards/cupboard-10.jpeg",
  //   },
  //   {
  //     id: 35,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["white"],
  //     price: 270,
  //     imgUrl: "/img/items/cupboards/cupboard-11.jpeg",
  //   },
  //   {
  //     id: 36,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["brown"],
  //     price: 245,
  //     imgUrl: "/img/items/cupboards/cupboard-12.jpeg",
  //   },
  //   {
  //     id: 37,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["white"],
  //     price: 305,
  //     imgUrl: "/img/items/cupboards/cupboard-13.jpeg",
  //   },
  //   {
  //     id: 38,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["white"],
  //     price: 380,
  //     imgUrl: "/img/items/cupboards/cupboard-14.jpeg",
  //   },
  //   {
  //     id: 39,
  //     name: "Cupboard",
  //     category: "cupboard",
  //     color: ["white"],
  //     price: 340,
  //     imgUrl: "/img/items/cupboards/cupboard-15.jpeg",
  //   },
  //   {
  //     id: 40,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 100,
  //     imgUrl: "/img/items/dressers/dresser-1.jpeg",
  //   },
  //   {
  //     id: 41,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["black", "brown"],
  //     price: 110,
  //     imgUrl: "/img/items/dressers/dresser-2.jpeg",
  //   },
  //   {
  //     id: 42,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["beige"],
  //     price: 130,
  //     imgUrl: "/img/items/dressers/dresser-3.jpeg",
  //   },
  //   {
  //     id: 43,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white", "blue"],
  //     price: 200,
  //     imgUrl: "/img/items/dressers/dresser-4.jpeg",
  //   },
  //   {
  //     id: 44,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 90,
  //     imgUrl: "/img/items/dressers/dresser-5.jpeg",
  //   },
  //   {
  //     id: 45,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 135,
  //     imgUrl: "/img/items/dressers/dresser-6.jpeg",
  //   },
  //   {
  //     id: 46,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["brown", "white"],
  //     price: 120,
  //     imgUrl: "/img/items/dressers/dresser-7.jpeg",
  //   },
  //   {
  //     id: 47,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 80,
  //     imgUrl: "/img/items/dressers/dresser-8.jpeg",
  //   },
  //   {
  //     id: 48,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["brown"],
  //     price: 145,
  //     imgUrl: "/img/items/dressers/dresser-9.jpeg",
  //   },
  //   {
  //     id: 49,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["black", "brown"],
  //     price: 100,
  //     imgUrl: "/img/items/dressers/dresser-10.jpeg",
  //   },
  //   {
  //     id: 50,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["beige", "white"],
  //     price: 85,
  //     imgUrl: "/img/items/dressers/dresser-11.jpeg",
  //   },
  //   {
  //     id: 51,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["beige", "white"],
  //     price: 110,
  //     imgUrl: "/img/items/dressers/dresser-12.jpeg",
  //   },
  //   {
  //     id: 52,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 90,
  //     imgUrl: "/img/items/dressers/dresser-13.jpeg",
  //   },
  //   {
  //     id: 53,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white", "beige"],
  //     price: 100,
  //     imgUrl: "/img/items/dressers/dresser-14.jpeg",
  //   },
  //   {
  //     id: 54,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white", "beige"],
  //     price: 75,
  //     imgUrl: "/img/items/dressers/dresser-15.jpeg",
  //   },
  //   {
  //     id: 55,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["brown"],
  //     price: 100,
  //     imgUrl: "/img/items/dressers/dresser-16.jpeg",
  //   },
  //   {
  //     id: 56,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 85,
  //     imgUrl: "/img/items/dressers/dresser-17.jpeg",
  //   },
  //   {
  //     id: 57,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["multy"],
  //     price: 95,
  //     imgUrl: "/img/items/dressers/dresser-18.jpeg",
  //   },
  //   {
  //     id: 58,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["white"],
  //     price: 130,
  //     imgUrl: "/img/items/dressers/dresser-19.jpeg",
  //   },
  //   {
  //     id: 59,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["sky", "brown"],
  //     price: 100,
  //     imgUrl: "/img/items/dressers/dresser-20.jpeg",
  //   },
  //   {
  //     id: 60,
  //     name: "Dresser",
  //     category: "dresser",
  //     color: ["multy", "brown"],
  //     price: 145,
  //     imgUrl: "/img/items/dressers/dresser-21.jpeg",
  //   },
  //   {
  //     id: 61,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["black", "brown"],
  //     price: 100,
  //     imgUrl: "/img/items/shelves/shelf-1.png",
  //   },
  //   {
  //     id: 62,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["white", "brown"],
  //     price: 45,
  //     imgUrl: "/img/items/shelves/shelf-2.jpeg",
  //   },
  //   {
  //     id: 63,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["white"],
  //     price: 60,
  //     imgUrl: "/img/items/shelves/shelf-3.jpeg",
  //   },
  //   {
  //     id: 64,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["white"],
  //     price: 20,
  //     imgUrl: "/img/items/shelves/shelf-4.jpeg",
  //   },
  //   {
  //     id: 65,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["brown"],
  //     price: 45,
  //     imgUrl: "/img/items/shelves/shelf-5.jpeg",
  //   },
  //   {
  //     id: 66,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["brown"],
  //     price: 35,
  //     imgUrl: "/img/items/shelves/shelf-6.png",
  //   },
  //   {
  //     id: 67,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["multy"],
  //     price: 75,
  //     imgUrl: "/img/items/shelves/shelf-7.jpeg",
  //   },
  //   {
  //     id: 68,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["white"],
  //     price: 80,
  //     imgUrl: "/img/items/shelves/shelf-8.jpeg",
  //   },
  //   {
  //     id: 69,
  //     name: "Shelf",
  //     category: "shelf",
  //     color: ["beige"],
  //     price: 65,
  //     imgUrl: "/img/items/shelves/shelf-9.jpeg",
  //   },
  //   {
  //     id: 70,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["grey"],
  //     price: 800,
  //     imgUrl: "/img/items/sofas/sofa-1.jpeg",
  //   },
  //   {
  //     id: 71,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["white"],
  //     price: 750,
  //     imgUrl: "/img/items/sofas/sofa-2.jpeg",
  //   },
  //   {
  //     id: 72,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["black"],
  //     price: 700,
  //     imgUrl: "/img/items/sofas/sofa-3.jpeg",
  //   },
  //   {
  //     id: 73,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["grey"],
  //     price: 800,
  //     imgUrl: "/img/items/sofas/sofa-4.jpeg",
  //   },
  //   {
  //     id: 74,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["white"],
  //     price: 800,
  //     imgUrl: "/img/items/sofas/sofa-5.jpeg",
  //   },
  //   {
  //     id: 75,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["white", "brown"],
  //     price: 850,
  //     imgUrl: "/img/items/sofas/sofa-6.jpeg",
  //   },
  //   {
  //     id: 76,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["grey"],
  //     price: 800,
  //     imgUrl: "/img/items/sofas/sofa-7.png",
  //   },
  //   {
  //     id: 77,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["white"],
  //     price: 800,
  //     imgUrl: "/img/items/sofas/sofa-8.png",
  //   },
  //   {
  //     id: 78,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["black"],
  //     price: 700,
  //     imgUrl: "/img/items/sofas/sofa-9.jpeg",
  //   },
  //   {
  //     id: 79,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["grey"],
  //     price: 850,
  //     imgUrl: "/img/items/sofas/sofa-10.png",
  //   },
  //   {
  //     id: 80,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["grey"],
  //     price: 800,
  //     imgUrl: "/img/items/sofas/sofa-11.jpeg",
  //   },
  //   {
  //     id: 81,
  //     name: "Sofa",
  //     category: "sofa",
  //     color: ["black"],
  //     price: 750,
  //     imgUrl: "/img/items/sofas/sofa-12.jpeg",
  //   },
  //   {
  //     id: 82,
  //     name: "Table",
  //     category: "table",
  //     color: ["brown", "black"],
  //     price: 100,
  //     imgUrl: "/img/items/tables/table-1.jpeg",
  //   },
  //   {
  //     id: 83,
  //     name: "Table",
  //     category: "table",
  //     color: ["white"],
  //     price: 120,
  //     imgUrl: "/img/items/tables/table-2.jpeg",
  //   },
  //   {
  //     id: 84,
  //     name: "Table",
  //     category: "table",
  //     color: ["white"],
  //     price: 100,
  //     imgUrl: "/img/items/tables/table-3.jpeg",
  //   },
  //   {
  //     id: 85,
  //     name: "Table",
  //     category: "table",
  //     color: ["white"],
  //     price: 100,
  //     imgUrl: "/img/items/tables/table-4.jpeg",
  //   },
  //   {
  //     id: 86,
  //     name: "Table",
  //     category: "table",
  //     color: ["white", "brown"],
  //     price: 110,
  //     imgUrl: "/img/items/tables/table-5.jpeg",
  //   },
  //   {
  //     id: 87,
  //     name: "Table",
  //     category: "table",
  //     color: ["white"],
  //     price: 100,
  //     imgUrl: "/img/items/tables/table-6.jpeg",
  //   },
  //   {
  //     id: 88,
  //     name: "Table",
  //     category: "table",
  //     color: ["white"],
  //     price: 100,
  //     imgUrl: "/img/items/tables/table-7.jpeg",
  //   },
  //   {
  //     id: 89,
  //     name: "Table",
  //     category: "table",
  //     color: ["white"],
  //     price: 100,
  //     imgUrl: "/img/items/tables/table-8.jpeg",
  //   },
  //   {
  //     id: 90,
  //     name: "Table",
  //     category: "table",
  //     color: ["beige"],
  //     price: 120,
  //     imgUrl: "/img/items/tables/table-9.jpeg",
  //   },
  //   {
  //     id: 91,
  //     name: "Table",
  //     category: "table",
  //     color: ["brown"],
  //     price: 135,
  //     imgUrl: "/img/items/tables/table-10.jpeg",
  //   },
  // ];
  // StoreItem.insertMany(items).then((items) => res.status(200).json(items));
};

module.exports = {
  getItems,
  addItems,
};
