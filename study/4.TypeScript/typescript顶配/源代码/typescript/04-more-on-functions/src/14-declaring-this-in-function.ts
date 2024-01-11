// sign 函数内 this 的声明

interface User {
    admin: boolean
}

interface Filter {
    (this: User): boolean
}

interface DB {
    filterUsers(filter: Filter): User[]
}


//  定义了 filterUsers 方法，该方法接受一个 Filter 类型的参数，而 Filter 是一个函数类型，具有 (this: User) => boolean 的签名。
const db: DB = {
    filterUsers: (filter: Filter) => {
        let user1: User = {
            admin: true
        }

        let user2: User = {
            admin: false
        }

        // 执行传递进来的函数，并将 this 设置为 user1
        filter.bind(user1)()
        // 执行传递进来的函数，并将 this 设置为 user2
        filter.bind(user2)()

        const result1 = filter.call(user1)

        return [user1, user2];
    }
}


// this: User 是 TypeScript 中用于声明函数的上下文（this）的类型注解。
// 具体来说，在 Filter 接口中，它定义了一个函数签名，该函数接受一个上下文为 User 类型的对象，并返回一个布尔值。


function filter(this: User) {
    console.log(this, 'this')
    return this.admin
}

const admins = db.filterUsers(filter)
console.log(admins)


// error: An arrow function cannot have a this parameter.
// const admins2 = db.filterUsers((this: User) => {
//     return this.admin
// })
//
// console.log(admins2)
