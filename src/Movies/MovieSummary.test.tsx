import MovieSummary, {PriceCompare} from "./MovieSummary";
import IMovieDetails from "../common/types/IMovieDetails";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import classes from "*.module.css";

configure({ adapter: new Adapter() });

describe("Summary Component", () => {
  test("renders", () => {
    const wrapper = shallow(
      <MovieSummary
        filmWorldMovieDetails={filmWorldMovie}
        cinemaWorldMovieDetails={cinemaWorldMovie}
        onClosePopup={() => {
          return;
        }}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  test("Title is displayed correctly", () => {
    const wrapper = shallow(
      <MovieSummary
        filmWorldMovieDetails={filmWorldMovie}
        cinemaWorldMovieDetails={cinemaWorldMovie}
        onClosePopup={() => {
          return;
        }}
      />
    ).dive();
    expect(wrapper.html()).toContain("Star Wars: Episode IV - A New Hope");

    expect(wrapper.html()).toContain('class="MovieSummary-cheaper-9">$ 29.5');
  });

  test("Cheapest item is highlighted with class cheaper", () => {
    const wrapper = shallow(
      <MovieSummary
        filmWorldMovieDetails={filmWorldMovie}
        cinemaWorldMovieDetails={cinemaWorldMovie}
        onClosePopup={() => {
          return;
        }}
      />
    ).dive();

    expect(wrapper.html()).toContain('class="MovieSummary-cheaper-9">$ 29.5');
  });

  test("compare the cheaper price with the expensive one",() => {
   expect(PriceCompare(2,5,classes)).toBe("cheaper")  
  }); 

  test("compare the same prices",() => {
   expect(PriceCompare(5,5,classes)).toBe("NA")  
  }); 

   test("compare the unavailable price with another price",() => {
   expect(PriceCompare(undefined,5,classes)).toBe("NA") 
}); 

   test("compare the expensive price with the cheaper one",() => {
   expect(PriceCompare(8,5,classes)).toBe("expensive")
  
  }); 
    
});

const cinemaWorldMovie: IMovieDetails = {
  Title: "Star Wars: Episode IV - A New Hope",
  Year: "1977",
  Plot: "Test.",
  Language: "English",
  Country: "USA",
  Rating: "8.7",
  ID: "cw0076759",
  Price: 123.5,
};

const filmWorldMovie: IMovieDetails = {
  Title: "Star Wars: Episode IV - A New Hope",
  Year: "1977",
  Plot: "Test.",
  Language: "English",
  Country: "USA",
  Rating: "8.7",
  ID: "fw0076759",
  Price: 29.5,
};
