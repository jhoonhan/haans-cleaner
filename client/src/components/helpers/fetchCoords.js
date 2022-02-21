import GoogleGeocoding from "../../apis/GoogleGeocoding";

const fetchCoords = async (address) => {
  const { street, city, zip } = address;
  const queryStreet = street
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("+");
  const queryCity = city
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("+");
  const queryZip = zip;

  const res = await GoogleGeocoding.get(
    `/json?address=${queryStreet},+${queryCity},+${queryZip}&key=${process.env.REACT_APP_GOOGLE_GEOCODING}`
  );

  return res.data.results[0].geometry.location;
};

export default fetchCoords;
