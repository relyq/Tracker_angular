import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { keydown } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {
  edit: boolean = false;
  organization: Organization = {
    id: '00000000-0000-0000-0000-000000000000',
    name: ''
  };
  keydown: Function = keydown;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[1].path === 'edit') {
      this.edit = true;
      this.getOrganization();
    }
  }

  getOrganization(): void {
    const id = this.route.snapshot.paramMap.get('organizationid');
    this.organizationService.getOrganization(id as string).subscribe((res) => {
      this.organization = res;
    });
  }

  onSubmit = () => {
    this.edit ? this.editOrganization() : this.createOrganization();
  };

  createOrganization(): void {
    this.organizationService
      .postOrganization(this.organization)
      .subscribe(() => {
        this.goBack();
      });
  }

  editOrganization(): void {
    this.organizationService
      .putOrganization(this.organization)
      .subscribe(() => {
        this.goBack();
      });
  }

  goBack(): void {
    let backRoute: string = this.edit
      ? '/tracker/organization/' + this.organization.id
      : '/tracker/organization';
    this.router.navigate([backRoute]);
  }
}
