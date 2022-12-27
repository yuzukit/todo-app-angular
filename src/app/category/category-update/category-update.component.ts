import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Color, ValueCreateCategory } from 'src/app/models/category';
import { HasSubscription } from 'src/app/models/hasSubscription';
import { CategoryService } from 'src/app/category.service';
import { TodoService } from 'src/app/todo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent extends HasSubscription {
  categoryForm: FormGroup;
  category:     ValueCreateCategory;
  colors:       Color[] = [];

  constructor(
    private route:           ActivatedRoute,
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location
  ) {
    super();
    this.categoryForm = new FormGroup({
      name:  new FormControl(null, Validators.required),
      slug:  new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required)
    });
    this.category = this.categoryForm.value;
  }

  ngOnInit(): void {
    this.getCategory();
    this.getColors();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }
  
  getCategory(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.push(this.categoryService.getCategory(id)
      .subscribe(category => {
        this.category = category;
        this.categoryForm.setValue({
          name:  this.category.name,
          slug:  this.category.slug,
          color: this.category.color
        });
      }));
  }

  getColors(): void {
    this.subscriptions.push(
      this.categoryService.getColors()
        .subscribe(colors => this.colors = colors)
    )
  }
   
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    this.category = this.categoryForm.value;
    if (this.category) {
      this.categoryService.updateCategory(this.category, Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(response =>
        console.log(response));
    }
  }
}
