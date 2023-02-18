import countriesJson from "../../data/countries.json" assert { type: "json" };
import type { Countries, Country } from "../../types/countryTypes";

class CountryManager {
  countriesList: Countries = countriesJson;

  getAll(): Countries {
    try {
      return this.countriesList;
    } catch (error: unknown) {
      console.error("[CountryManager]: Error find all conuntry or code", (error as Error).message);

      return [];
    }
  }

  get(countryOrCode: string): Country | undefined {
    try {
      return this.countriesList.find((data) => data.origin === countryOrCode || data.codes.includes(countryOrCode));
    } catch (error: unknown) {
      console.error("[CountryManager]: Error find conuntry or code", (error as Error).message);

      return undefined;
    }
  }
}

export default new CountryManager();
