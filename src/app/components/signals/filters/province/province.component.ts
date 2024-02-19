import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsService } from '../../../../services/signals/regions.service';
import { ProvincesService } from '../../../../services/signals/provinces.service';

@Component({
  selector: 'app-province',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './province.component.html',
  styleUrl: './province.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvinceComponent {
  public regionSelected = this.regionsService.regionSelected;

  public currentPage = this.provincesService.currentPage;
  public itemsPerPage = this.provincesService.itemsPerPage;
  public lastPage = this.provincesService.lastPage;
  public provinces = this.provincesService.provinces;
  public provinceSelected = this.provincesService.provinceSelected;

  constructor(
    private regionsService: RegionsService,
    private provincesService: ProvincesService
  ) {
    effect(
      () => {
        if (this.regionSelected()) {
          this.provincesService.getProvinces(
            this.regionSelected()!.iso,
            this.currentPage()
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  public getProvinces(page: number): void {
    if (page < 1 || page > this.lastPage()) return;
    this.provincesService.getProvinces(this.regionSelected()!.iso, page);
  }

  selectProvince(province: string): void {
    const provinceSelected = this.provincesService
      .provinces()
      .find((p) => p.province === province);
    this.provincesService.provinceSelected.set(provinceSelected);
  }

  public onScroll(event: Event): void {
    const target = event.target as HTMLInputElement;
    let { offsetHeight, scrollTop, scrollHeight } = target;

    if (offsetHeight + scrollTop >= scrollHeight) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
