class Category {
    private list: string[] = [
        
    ]

    // add a category to the category list
    addToList(category: string) {
        this.list.push(category);
    }
    
    // remove a category from the category list
    removeFromList(category: string) {
        try {
            delete this.list[this.list.indexOf(category)];
        } catch(e) {
            throw new Error("Couldnt delete category");
        }
    }

    // return the list of categories.
    getList() {
        return this.list;
    }
}

export default Category;