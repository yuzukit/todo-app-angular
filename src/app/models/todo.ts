export interface ViewValueTodo { // 表示する内容
    id:             number,
    title:          string,
    body:           string,
    state:          string,
    category_name:  string,
    color?:         string
}

export interface ValueCreateTodo { // Todoの登録や更新の内容
    category_id: number,
    title:       string,
    body:        string,
    state:       number
}

export interface States {
    id:   number,
    name: string
}