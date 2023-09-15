export interface StateUser {
    email: string | null
    uid: string
    isAuthenticated: boolean
}

export interface Ingredient {
    name: string
    amount: string
}

export interface Comment {
    user: string
    text: string
}

export interface Category {
    id: string
    name: string
}

export interface Recipe {
    id: string
    name: string
    ingredients: Array<Ingredient>
    description: string
    categories: Array<Category>
    comments: Array<Comment>
}

export interface Recipes {
   data: Array<Recipe>
}
