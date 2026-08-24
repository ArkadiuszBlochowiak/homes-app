import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { HousingLocation } from "../housing-location/housing-location";
import { HousingService } from "../housing.service";
import { HousingLocationInfo } from "../housinglocation";
@Component({
  selector: "app-home",
  imports: [HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      @for (item of filteredLocationList; track $index) {
        <app-housing-location [housingLocation]="item" />
      }
    </section>
  `,
  styleUrl: "./home.css",
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
        this.changeDetectorRef.markForCheck();
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((item) =>
      item.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
