import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Color, ValueCreateCategory } from 'src/app/models/category';
import { HasSubscription } from 'src/app/models/hasSubscription';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent extends HasSubscription implements OnInit {

  categoryForm: FormGroup;
  colors:       Color[] = [];
  category:     ValueCreateCategory;

  constructor(
    private categoryService: CategoryService
  ) {
    super();
    this.categoryForm = new FormGroup({
      name:  new FormControl(null, Validators.required),
      slug:  new FormControl(null, [Validators.required, Validators.pattern("^[0-9a-zA-Z]+")]),
      color: new FormControl(null, Validators.required)
    });
    this.category = this.categoryForm.value;
  }

  getColors(): void {
    this.subscriptions.push(
      this.categoryService.getColors()
          .subscribe(colors => {
            this.colors = colors;
          })
    );
  }

  ngOnInit(): void {
    this.getColors();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  addCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    this.category = this.categoryForm.value;
    this.subscriptions.push(
      this.categoryService.add(this.category).subscribe(response => {
        console.log(response)
      })
    );
  }

}
