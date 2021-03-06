const router = require('express').Router();
const { Product } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).send(allProducts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await Product.update(req.body, {where: {id: req.params.id}});
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
