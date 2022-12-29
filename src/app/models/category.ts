export interface ViewValueCategory { // 表示する内容
    id:    number,
    name:  string,
    slug:  string,
    color: string
}

export interface ValueCreateCategory { // Todoの登録や更新の内容
    name:  string,
    slug:  string,
    color: number
}

export interface Color {
    id:   number,
    name: string
}