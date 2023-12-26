import { NgIf, NgFor, NgClass, TitleCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { TextFieldModule } from "@angular/cdk/text-field";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FuseCardComponent } from "@fuse/components/card";

@Component({
    selector     : 'uplode',
    standalone   : true,
    templateUrl  : './uplode.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [MatButtonModule, FormsModule, NgFor, FuseCardComponent, MatButtonModule, MatIconModule, RouterLink, NgClass, MatMenuModule, MatCheckboxModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatDividerModule, MatTooltipModule, TitleCasePipe],
    styles         : [
        `
          cards fuse-card {
                margin: 16px;
            }
        `
        ],
})
export class UplodeComponent{
    imageUrl: string | ArrayBuffer | null = null;

    onSelected(event: any): void {
      const selectedFile = event.target.files[0];
  
      if (selectedFile) {
        const allowed = ['.jpeg', '.png', '.jpg'];
        const allowedSizeInBytes = 6 * 1024 * 1024;
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
  
        if (allowed.includes(`.${fileExtension}`) && selectedFile.size <= allowedSizeInBytes) {
          this.DisplayImage(selectedFile);
        } else {
          if (!allowed.includes(`.${fileExtension}`)) {
            alert('Only Access JPEG or JPG image.');
          } else if (selectedFile.size > allowedSizeInBytes) {
            alert('File size allowed limit (6MB).');
          }
          event.target.value = null;
        }
      }
    }
  
    DisplayImage(file: File): void {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }