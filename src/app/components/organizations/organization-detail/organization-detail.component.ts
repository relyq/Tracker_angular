import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {
  organization!: Organization;
  previousUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private router: Router,
    public Modal: MatDialog
  ) {
    this.previousUrl = this.router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString() as string;
  }

  ngOnInit(): void {
    this.getOrganization();
  }

  getOrganization(): void {
    const id = this.route.snapshot.paramMap.get('organizationid');
    this.organizationService.getOrganization(id as string).subscribe((res) => {
      this.organization = res;
    });
  }

  deleteOrganization(): void {
    this.Modal.open(DeleteModalComponent, { width: '250px' })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.organization.id) {
          this.organizationService
            .deleteOrganization(this.organization.id)
            .subscribe(() => {
              this.goBack();
            });
        }
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/tracker/organization');
  }
}
