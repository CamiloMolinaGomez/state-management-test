import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsService } from '../../../../services/behavior-subject/regions.service';
import { ProvincesService } from '../../../../services/behavior-subject/provinces.service';

@Component({
  selector: 'app-province',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './province.component.html',
  styleUrl: './province.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvinceComponent {
  // behavior subjects
  public regionSelected$ = this.regionsService.regionSelected$;

  public currentPage$ = this.provincesService.currentPage$;
  public itemsPerPage$ = this.provincesService.itemsPerPage$;
  public lastPage$ = this.provincesService.lastPage$;
  public provinces$ = this.provincesService.provinces$;
  public provinceSelected$ = this.provincesService.provinceSelected$;

  constructor(
    private regionsService: RegionsService,
    private provincesService: ProvincesService
  ) {
    this.regionSelected$.subscribe((region) => {
      if (region) {
        this.provincesService.getProvinces(
          this.regionSelected$.value!.iso,
          this.currentPage$.value
        );
      }
    });
  }

  public getProvinces(page: number): void {
    if (page < 1 || page > this.lastPage$.value) return;
    this.provincesService.getProvinces(this.regionSelected$.value!.iso, page);
  }

  selectProvince(province: string): void {
    const provinceSelected = this.provincesService.provinces$.value.find(
      (p) => p.province === province
    );
    this.provincesService.provinceSelected$.next(provinceSelected);
  }

  public onScroll(event: Event): void {
    console.log('onScroll');
    const target = event.target as HTMLInputElement;
    let { offsetHeight, scrollTop, scrollHeight } = target;

    if (offsetHeight + scrollTop >= scrollHeight) {
      this.currentPage$.next(this.currentPage$.value + 1);
      this.provincesService.getProvinces(
        this.regionSelected$.value!.iso,
        this.currentPage$.value
      );
    }
  }
}
