import { Component } from '@angular/core';
import { ViewValueCategory } from '../models/category';
import { CategoryService } from '../category.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {
  categories: ViewValueCategory[] = [];
  selectedTodo?: ViewValueCategory;

  constructor(private categoryService: CategoryService) {}

  getCategories(): void {
    this.categoryService.getCategories()
        .subscribe(category => {
          this.categories = category;
        });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
