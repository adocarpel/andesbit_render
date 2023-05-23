const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/users')
const { validateCreate } = require('../validators/users')

router.get('/', checkAuth, checkRoleAuth(['admin']), getItems)

router.get('/:id', checkOrigin, getItem)

//TODO: Donde recibimos data
//router.post('/', checkOrigin, validateCreate, createItem)
router.post('/', checkOrigin, createItem)
//router.post('/', createItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem)


module.exports = router