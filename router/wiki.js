const express = require('express');
const wikiRouter = express.Router();
const { Page, User } = require('../models');
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views');

wikiRouter.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

wikiRouter.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const page = await Page.create(req.body);

    page.setAuthor(user);

    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
  // res.send('Got to post wiki')
});

wikiRouter.get('/add', (req, res, next) => {
  res.send(addPage());
});

wikiRouter.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    let author = await page.getAuthor();
    author = author.dataValues.name;
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = wikiRouter;
