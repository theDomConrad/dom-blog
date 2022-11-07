const router = require('express').Router();
const { Blog, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
            })

        const blogs = blogData.map((post) => post.get({ plain: true }));
        res.render('home',
            { blogs
            // isLogged: req.session.isLogged 
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;