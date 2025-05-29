import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurent-dash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObj: RestaurentData = new RestaurentData();
  allRestaurentData$!: Observable<RestaurentData[]>; // Async pipe will subscribe automatically
  showAdd!: boolean;
  showBtn!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      services: ['', Validators.required],
    });

    // Fetch all data initially
    this.getAllData();
  }

  clickAddResto() {
    this.formValue.reset(); // Reset form values
    this.showAdd = true; // Show Add button
    this.showBtn = false; // Hide Update button
  }

  addRestaurent() {
    // Assign form values to the model
    this.restaurentModelObj = this.formValue.value;

    this.api.postRestaurent(this.restaurentModelObj).subscribe({
      next: (res) => {
        alert('Restaurant Added Successfully');
        this.formValue.reset();
        const ref = document.getElementById('close');
        ref?.click(); // Close the modal
        this.getAllData(); // Refresh the list
      },
      error: () => alert('Failed to Add Restaurant'),
    });
  }

  // Fetch all restaurants
  getAllData() {
    this.allRestaurentData$ = this.api.getRestaurent();
  }

  // Delete a restaurant by ID
  deleteResto(id: string) {
    this.api.deleteResto(id).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Restaurant Deleted Successfully');
        this.getAllData(); // Re-fetch data
      },
      error: (err: any) => {
        console.log(err);
        alert('Failed to delete restaurant!');
      }
    });
  }

  onEditResto(data: RestaurentData) {
    this.showAdd = false; // Hide Add button
    this.showBtn = true; // Show Update button
  
    this.restaurentModelObj = { ...data }; // Copy data for editing (includes _id)
    this.formValue.patchValue(data); // Populate the form with selected restaurant's data
  }
  

  // Update restaurant details
  updateResto() {
    // Prepare updated data object
    const updatedData = {
      name: this.formValue.value.name,
      email: this.formValue.value.email,
      mobile: this.formValue.value.mobile,
      address: this.formValue.value.address,
      services: this.formValue.value.services,
    };
  
    // Log for debugging
    console.log('Updating Restaurant:', this.restaurentModelObj._id, updatedData);
  
    // Call API to update
    this.api.updateRestaurant(this.restaurentModelObj._id!, updatedData)
      .subscribe({
        next: (res: any) => {
          alert('Restaurant Updated Successfully');
          this.formValue.reset();
          document.getElementById('close')?.click(); // Close modal
          this.getAllData(); // Refresh the data
        },
        error: (err: any) => {
          console.error('Update Error:', err);
          alert('Update Failed!');
        },
      });
  }
  
  
}
