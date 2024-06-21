import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../authenticated/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'master',
    loadChildren: () =>
      import('../../authenticated/master/master.module').then(
        (m) => m.MasterModule
      ),
  },
  {
    path: 'log-entry',
    loadChildren: () =>
      import('../../authenticated/log-entry/log-entry.module').then(
        (m) => m.LogEntryModule
      ),
  },
  {
    path: 'ballistic',
    loadChildren: () =>
      import(
        '../../authenticated/ballistic-department/ballistic-department.module'
      ).then((m) => m.BallisticDepartmentModule),
  },
  {
    path: 'biology',
    loadChildren: () =>
      import(
        '../../authenticated/biology-department/biology-department.module'
      ).then((m) => m.BiologyDepartmentModule),
  },
  {
    path: 'cyber',
    loadChildren: () =>
      import(
        '../../authenticated/cyber-department/cyber-department.module'
      ).then((m) => m.CyberDepartmentModule),
  },
  {
    path: 'dna',
    loadChildren: () =>
      import('../../authenticated/dna-department/dna-department.module').then(
        (m) => m.DnaDepartmentModule
      ),
  },
  {
    path: 'general',
    loadChildren: () =>
      import(
        '../../authenticated/general-analytics-department/general-analytics-department.module'
      ).then((m) => m.GeneralAnalyticsDepartmentModule),
  },
  {
    path: 'photography',
    loadChildren: () =>
      import(
        '../../authenticated/photography-department/photography-department.module'
      ).then((m) => m.PhotographyDepartmentModule),
  },
  {
    path: 'physics',
    loadChildren: () =>
      import(
        '../../authenticated/physics-department/physics-department.module'
      ).then((m) => m.PhysicsDepartmentModule),
  },
  {
    path: 'prohibition',
    loadChildren: () =>
      import(
        '../../authenticated/prohibition-department/prohibition-department.module'
      ).then((m) => m.ProhibitionDepartmentModule),
  },
  {
    path: 'psychology',
    loadChildren: () =>
      import(
        '../../authenticated/psychology-department/psychology-department.module'
      ).then((m) => m.PsychologyDepartmentModule),
  },
  {
    path: 'tasi',
    loadChildren: () =>
      import('../../authenticated/tasi-department/tasi-department.module').then(
        (m) => m.TasiDepartmentModule
      ),
  },
  {
    path: 'toxicology',
    loadChildren: () =>
      import(
        '../../authenticated/toxicology-department/toxicology-department.module'
      ).then((m) => m.ToxicologyDepartmentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedLayoutRoutingModule {}
