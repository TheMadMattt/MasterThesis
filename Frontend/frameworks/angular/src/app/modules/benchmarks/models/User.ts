export interface User {
  id: any;
  name: UserTitle;
  location: UserLocation;
  email: string;
  gender: string;
  picture: Picture;
  phone: string;
}

interface UserTitle {
  title: string;
  first: string;
  last: string;
}

interface UserLocation {
  street: StreetName;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

interface StreetName {
  number: number;
  name: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
