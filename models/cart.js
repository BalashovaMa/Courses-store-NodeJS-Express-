const path = require('path')
const fs = require('fs');

const p = path.join(__dirname, '..', 'data', 'cart.json');

class Cart {
    static async add(course) {
        const cart = await Cart.fetch();

        const idx = cart.courses.findIndex(c => c.id === course.id)
        const candidate = cart.courses[idx]

        if (candidate) {//в корзине уже есть такой курс
            candidate.count++
            cart.courses[idx] = candidate

        } else {
            course.count = 1
            cart.courses.push(course)
        }
        cart.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })

    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

    static async remove(id) {
        const cart = await Cart.fetch()

        const idx = cart.courses.findIndex(c => c.id === id)
        const course = cart.courses[idx]

        if (course.count === 1) {
            cart.courses = cart.courses.filter(c => c.id !== id)
        } else {
            cart.courses[idx].count--
        }
        cart.price -= course.price
        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                } else {
                    resolve(cart)
                }
            })
        })
    }
}

module.exports = Cart