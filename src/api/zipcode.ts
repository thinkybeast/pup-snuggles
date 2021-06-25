import usZips from "us-zips/array";

export default (req, res) => {
  // Return array of 41,000 zip codes that include search substring.
  const matches = usZips.filter((zip) => {
    return zip.zipCode.includes(req.query.zip);
  });

  res.status(200).json(matches);
};
