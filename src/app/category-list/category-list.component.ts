import { Component } from '@angular/core';
import { ViewValueCategory } from '../models/category';
import { CategoryService } from '../category.service';
import { OnInit } from '@angular/core';
import { HasSubscription } from '../models/hasSubscription';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent extends HasSubscription implements OnInit {
  categories: ViewValueCategory[] = [];
  selectedTodo?: ViewValueCategory;

  constructor(private categoryService: CategoryService) {
    super();
  }

  getCategories(): void {
    this.subscriptions.push(
      this.categoryService.getCategories()
          .subscribe(category => {
            this.categories = category;
          })
    );
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  deleteCategory(category: ViewValueCategory): void {
    this.subscriptions.push(
      this.categoryService.deleteCategory(category.id).subscribe(response => 
        console.log(response))
    );
  }

}
