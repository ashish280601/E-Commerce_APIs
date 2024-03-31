export default class ProductModel{

    // creating a hardcoded database filed.
    constructor(id, name, desc, imageUrl, price, category, size){
        this.id = id,
        this.name = name,
        this.desc = desc,
        this.imageUrl = imageUrl,
        this.price = price,
        this.category = category,
        this.size = size
    }

    static getAll(){
        return products; 
    }
}

// creating an product database 
var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for product 1',
        'http://m.meida-amazon.com',
        19.99,
        'Category 1',
        ['M', 'XL']
    ),
    new ProductModel(
        1,
        'Product 2',
        'Description for product 2',
        'http://m.meida-amazon.com',
        500,
        'Category 2',
        ['M', 'XM', 'L', 'S']
    ),
    new ProductModel(
        1,
        'Product 3',
        'Description for product 3',
        'http://m.meida-amazon.com',
        1000,
        'Category 3',
        ['M', 'XL','S']
    ),
    new ProductModel(
        1,
        'Product 4',
        'Description for product 4',
        'http://m.meida-amazon.com',
        1500,
        'Category 4',
        ['M', 'L', 'S']
    ),
]