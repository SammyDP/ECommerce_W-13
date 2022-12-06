const router = require("express").Router();
const { Category, Product } = require("../../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories (be sure to include its associated Products)
  // same as before, add try/catch with async
  try {
    const catPro = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(catPro);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value (be sure to include its associated Products)
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(oneCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  // same as creating tags
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCat) => {
      res.json(newCat);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      //fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCat) => {
      res.json(updatedCat);
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCat) => {
      res.json(deletedCat);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
