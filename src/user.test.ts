interface User {
    name: string
}

class Staff implements User {
    name: string
    permissions = ['create_user']

    constructor(name: string) {
        this.name = name
    }
}

class Customer implements User {
    name: string
    credit: number

    constructor(name: string) {
        this.name = name
        this.credit = 0
    }
}

test("user",()=>{


    const staffUser = new Staff('admin')

    const customerUser = new Customer('Markus')

    /**
     * Explain the compiler errors in line 42 and 47
     */
    const wrappedMethod =(user: User, callback: (user: User) => User): User => {
        console.log(user.name)
        return callback(user)
    }

    wrappedMethod(staffUser, (staff) => {
        console.log(staff.permissions)
        return staff
    })

    wrappedMethod(customerUser, (customer) => {
        console.log(customer.credit)
        return customer
    })
})
