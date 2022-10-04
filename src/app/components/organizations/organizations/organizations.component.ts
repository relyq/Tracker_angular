import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe((res) => {
      this.organizations = res;
    });
  }
}
